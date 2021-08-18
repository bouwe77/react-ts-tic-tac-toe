import { useState } from 'react'
import { tw } from 'twind'

enum TileStatus {
  AVAILABLE = 'available',
  CHOSEN = 'chosen',
  WIN = 'win',
  DRAW = 'draw',
}

enum TileValue {
  X = 'X',
  O = 'O',
  EMPTY = '',
}

type Tile = {
  value: TileValue
  status: TileStatus
}

enum GameStatus {
  X_TURN = "Player X's turn",
  O_TURN = "Player O's turn",
  X_WON = 'Player X wins!!!',
  O_WON = 'Player O wins!!!',
  DRAW = 'Draw...',
}

const initialTiles: Array<Tile> = Array(9).fill({
  value: TileValue.EMPTY,
  status: TileStatus.AVAILABLE,
})

const initialGameStatus = GameStatus.X_TURN

export default function App() {
  const [tiles, setTiles] = useState(initialTiles)
  const [gameStatus, setGameStatus] = useState<GameStatus>(initialGameStatus)

  const gameStarted = tiles.some((t) => t.value !== TileValue.EMPTY)
  const gameOver = ![GameStatus.X_TURN, GameStatus.O_TURN].includes(gameStatus)

  function handleClick(index: number) {
    if (gameOver || tiles[index].value !== TileValue.EMPTY) return

    let updatedTiles = [...tiles]
    updatedTiles[index] = {
      value: determineCurrentPlayer(tiles),
      status: TileStatus.CHOSEN,
    }

    const newGameStatus = determineGameStatus(updatedTiles)
    setGameStatus(newGameStatus)

    if (
      newGameStatus === GameStatus.DRAW ||
      newGameStatus === GameStatus.X_WON ||
      newGameStatus === GameStatus.O_WON
    ) {
      updatedTiles = updatedTiles.map((tile) => {
        return { ...tile, status: TileStatus.DRAW }
      })
    }

    if (
      newGameStatus === GameStatus.X_WON ||
      newGameStatus === GameStatus.O_WON
    ) {
      const winningIndexes = getThreeInARowIndexes(updatedTiles)
      updatedTiles[winningIndexes[0]] = {
        ...updatedTiles[winningIndexes[0]],
        status: TileStatus.WIN,
      }
      updatedTiles[winningIndexes[1]] = {
        ...updatedTiles[winningIndexes[1]],
        status: TileStatus.WIN,
      }
      updatedTiles[winningIndexes[2]] = {
        ...updatedTiles[winningIndexes[2]],
        status: TileStatus.WIN,
      }
    }

    setTiles(updatedTiles)
  }

  function tryAgain() {
    setTiles(initialTiles)
    setGameStatus(initialGameStatus)
  }

  const buttons = tiles.map((tile, index) => {
    let button
    switch (tile.status) {
      case TileStatus.AVAILABLE:
        button = (
          <AvailableButton
            label={`button-${index}`}
            onClick={() => handleClick(index)}
          >
            {tile.value}
          </AvailableButton>
        )
        break
      case TileStatus.CHOSEN:
        button = (
          <UnavailableButton label={`button-${index}`}>
            {tile.value}
          </UnavailableButton>
        )
        break

      case TileStatus.DRAW:
        button = (
          <DisabledButton label={`button-${index}`}>
            {tile.value}
          </DisabledButton>
        )
        break
      case TileStatus.WIN:
        button = (
          <WinnerButton label={`button-${index}`}>{tile.value}</WinnerButton>
        )
        break
      default:
        throw new Error('Unknown tile status: ' + tile.status)
    }

    return <div key={index}>{button}</div>
  })

  return (
    <div className={tw`h-screen flex items-center justify-center`}>
      <div>
        <h1 className={tw`text-5xl text-center text-blue-900`}>TIC TAC TOE</h1>

        <div
          className={tw`h-16 flex items-center justify-center text-xl font-light`}
        >
          {gameStatus}
        </div>

        <div className={tw`flex flex-col`}>
          <div className={tw`flex flex-row`}>
            {buttons.slice(0, 3).map((button, i) => button)}
          </div>

          <div className={tw`flex flex-row`}>
            {buttons.slice(3, 6).map((button, i) => button)}
          </div>

          <div className={tw`flex flex-row`}>
            {buttons.slice(6, 9).map((button, i) => button)}
          </div>
        </div>

        <div className={tw`h-20 flex items-center justify-center`}>
          {gameStarted && (
            <button
              onClick={tryAgain}
              className={tw`bg-blue-500 border-white rounded border-1 shadow-sm text-2xl font-light w-48 h-12 text-center text-white`}
            >
              {gameOver ? 'Try again' : 'Reset'}
            </button>
          )}
        </div>

        <div className={tw`text-center`}>
          Made by{' '}
          <a href="https://bouwe.io" className={tw`underline`}>
            Bouwe
          </a>{' '}
          🧔🏻
        </div>
      </div>
    </div>
  )
}

function DisabledButton({
  children,
  label,
}: {
  children: string
  label: string
}) {
  return (
    <button
      className={tw`align-top bg-gray-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default`}
      aria-label={label}
      disabled={true}
    >
      {children}
    </button>
  )
}

function AvailableButton({
  children,
  label,
  onClick,
}: {
  children: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      className={tw`align-top bg-blue-500 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-blue-500`}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function UnavailableButton({
  children,
  label,
}: {
  children: string
  label: string
}) {
  return (
    <button
      className={tw`align-top bg-blue-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-black cursor-default`}
      aria-label={label}
      disabled={true}
    >
      {children}
    </button>
  )
}

function WinnerButton({
  children,
  label,
}: {
  children: string
  label: string
}) {
  return (
    <button
      className={tw`align-top bg-green-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default`}
      aria-label={label}
      disabled={true}
    >
      {children}
    </button>
  )
}

function determineCurrentPlayer(tiles: Array<Tile>) {
  return tiles.filter((t) => t.value === TileValue.X).length >
    tiles.filter((t) => t.value === TileValue.O).length
    ? TileValue.O
    : TileValue.X
}

function getThreeInARowIndexes(tiles: Array<Tile>) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function isThreeInARow(x: number, y: number, z: number) {
    if (
      tiles[x].value === TileValue.EMPTY ||
      tiles[y].value === TileValue.EMPTY ||
      tiles[z].value === TileValue.EMPTY
    )
      return false

    return (
      tiles[x].value === tiles[y].value && tiles[y].value === tiles[z].value
    )
  }

  for (let combination of combinations) {
    const [x, y, z] = combination
    if (isThreeInARow(x, y, z)) {
      return combination
    }
  }
  return []
}

function determineGameStatus(tiles: Array<Tile>) {
  const threeInARowIndexes = getThreeInARowIndexes(tiles)
  if (threeInARowIndexes.length > 0) {
    return tiles[threeInARowIndexes[0]].value === TileValue.X
      ? GameStatus.X_WON
      : GameStatus.O_WON
  }

  if (tiles.every((t) => t.value !== TileValue.EMPTY)) return GameStatus.DRAW

  return determineCurrentPlayer(tiles) === TileValue.X
    ? GameStatus.X_TURN
    : GameStatus.O_TURN
}
