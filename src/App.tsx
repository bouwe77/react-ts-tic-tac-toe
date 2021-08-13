import { useState } from 'react'
import { tw } from 'twind'

const initialTiles = () => Array(9).fill(null)

enum GameStatuses {
  X_TURN = "Player X's turn",
  O_TURN = "Player O's turn",
  X_WON = 'Player X wins!!!',
  O_WON = 'Player O wins!!!',
  DRAW = 'Draw...',
}

export default function App() {
  const [tiles, setTiles] = useState(initialTiles)

  const gameStatus = determineGameStatus(tiles)
  const gameOver = ![GameStatuses.X_TURN, GameStatuses.O_TURN].includes(
    gameStatus,
  )

  function handleClick(index: number) {
    if (gameOver || tiles[index]) return

    const updatedTiles = [...tiles]
    updatedTiles[index] = determineCurrentPlayer(tiles)

    setTiles(updatedTiles)
  }

  function tryAgain() {
    setTiles(initialTiles)
  }

  return (
    <div className={tw`h-screen flex items-center justify-center`}>
      <div className={tw``}>
        <h1 className={tw`text-5xl text-center text-blue-900`}>
          TIC TAC TOE
        </h1>

        <div className={tw`h-16 flex items-center justify-center text-xl font-light`}>
          {gameStatus}
        </div>

        <div className={tw`flex flex-col`}>
          <TileRow
            tiles={tiles.slice(0, 3)}
            startIndex={0}
            handleClick={handleClick}
            disabled={gameOver}
          />
          <TileRow
            tiles={tiles.slice(3, 6)}
            startIndex={3}
            handleClick={handleClick}
            disabled={gameOver}
          />
          <TileRow
            tiles={tiles.slice(6, 9)}
            startIndex={6}
            handleClick={handleClick}
            disabled={gameOver}
          />
        </div>

        <div className={tw`h-20 flex items-center justify-center`}>
          <button onClick={tryAgain}
              className={tw`bg-blue-500 border-white rounded border-1 shadow-sm text-2xl font-light w-48 h-12 text-center text-white`}
              >{gameOver ? 'Try again' : 'Reset'}</button>
        </div>
      </div>
    </div>
  )
}

function TileRow({
  tiles,
  startIndex,
  handleClick,
  disabled,
}: {
  tiles: string[]
  startIndex: number
  handleClick: (index: number) => void
  disabled: boolean
}) {
  return (
    <div className={tw`flex flex-row`}>
      {tiles.map((tile, i) => {
        let index = i + startIndex
        return (
          <div key={index}>
            <button
              aria-label={`button-${index + 1}`}
              className={disabled ? tw`bg-gray-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default` : tw`bg-blue-500 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white`}
              onClick={() => handleClick(index)}
              disabled={disabled}
            >
              {tile}
            </button>
          </div>
        )
      })}
    </div>
  )
}

const player = {
  X: 'X',
  O: 'O',
}

function determineCurrentPlayer(tiles: string[]) {
  return tiles.filter((t) => t === player.X).length >
    tiles.filter((t) => t === player.O).length
    ? player.O
    : player.X
}

function determineGameStatus(tiles: string[]) {
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

  for (let combination of combinations) {
    const [x, y, z] = combination
    if (threeInARow(x, y, z))
      return tiles[x] === player.X ? GameStatuses.X_WON : GameStatuses.O_WON
  }

  if (tiles.every((t) => !!t)) return GameStatuses.DRAW

  return determineCurrentPlayer(tiles) === player.X
    ? GameStatuses.X_TURN
    : GameStatuses.O_TURN

  function threeInARow(x: number, y: number, z: number) {
    if (!tiles[x] || !tiles[y] || !tiles[z]) return false
    return tiles[x] === tiles[y] && tiles[y] === tiles[z]
  }
}
