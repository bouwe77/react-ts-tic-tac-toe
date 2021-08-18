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
  index: number
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

const initialTiles: Array<Tile> = [
  {
    index: 0,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 1,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 2,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 3,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 4,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 5,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 6,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 7,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
  {
    index: 8,
    value: TileValue.EMPTY,
    status: TileStatus.AVAILABLE,
  },
]

const initialGameStatus = GameStatus.X_TURN

export default function App() {
  const [tiles, setTiles] = useState(initialTiles)
  const [gameStatus, setGameStatus] = useState<GameStatus>(initialGameStatus)

  const gameStarted = tiles.some((t) => t.value !== TileValue.EMPTY)
  const gameOver = ![GameStatus.X_TURN, GameStatus.O_TURN].includes(gameStatus)

  function handleClick(tile: Tile) {
    if (gameOver || tile.value !== TileValue.EMPTY) return

    let updatedTiles = [...tiles]
    updatedTiles[tile.index] = {
      ...updatedTiles[tile.index],
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
            {tiles.slice(0, 3).map((tile) => (
              <div key={tile.index}>
                <TileButton tile={tile} handleClick={() => handleClick(tile)} />
              </div>
            ))}
          </div>

          <div className={tw`flex flex-row`}>
            {tiles.slice(3, 6).map((tile) => (
              <div key={tile.index}>
                <TileButton tile={tile} handleClick={() => handleClick(tile)} />
              </div>
            ))}
          </div>

          <div className={tw`flex flex-row`}>
            {tiles.slice(6, 9).map((tile) => (
              <div key={tile.index}>
                <TileButton tile={tile} handleClick={() => handleClick(tile)} />
              </div>
            ))}
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

function TileButton({
  tile,
  handleClick,
}: {
  tile: Tile
  handleClick: () => void
}) {
  const isDisabled = tile.status !== TileStatus.AVAILABLE

  let bgColor = 'bg-red-300'
  let cursor = 'cursor-default'
  switch (tile.status) {
    case TileStatus.AVAILABLE:
      bgColor = 'bg-blue-500'
      cursor = ''
      break
    case TileStatus.CHOSEN:
      bgColor = 'bg-blue-300'
      break
    case TileStatus.WIN:
      bgColor = 'bg-green-300'
      break
    case TileStatus.DRAW:
      bgColor = 'bg-gray-300'
      break
  }

  return (
    <button
      className={tw`${bgColor} ${cursor} text-white align-top border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center`}
      aria-label={`button-${tile.index}`}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : handleClick}
    >
      {tile.value}
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
