import { useState } from 'react'
import { tw } from 'twind'

const initialTiles = () => Array(9).fill(player.EMPTY)

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
  const gameStarted = tiles.some((t) => t !== '-')
  const gameOver = ![GameStatuses.X_TURN, GameStatuses.O_TURN].includes(
    gameStatus,
  )

  function handleClick(index: number) {
    if (gameOver || tiles[index] !== player.EMPTY) return

    const updatedTiles = [...tiles]
    updatedTiles[index] = determineCurrentPlayer(tiles)

    setTiles(updatedTiles)
  }

  function tryAgain() {
    setTiles(initialTiles)
  }

  const buttons = tiles.map((tile, index) => {
    return (
      <div key={index}>
        {gameOver ? (
          <DisabledButton label={`button-${index}`}>{tile}</DisabledButton>
        ) : tile === player.EMPTY ? (
          <AvailableButton
            label={`button-${index}`}
            onClick={() => handleClick(index)}
          >
            {tile}
          </AvailableButton>
        ) : (
          <button
            aria-label={`button-${index}`}
            className={tw`bg-blue-500 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white`}
            onClick={() => handleClick(index)}
          >
            {tile}
          </button>
        )}
      </div>
    )
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
          🧔
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
      className={tw`bg-gray-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default`}
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
      className={tw`bg-blue-500 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-blue-500`}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// function UnavailableButton({
//   children,
//   onClick,
//   ...rest
// }: {
//   children: string
//   onClick: () => void
// }) {
//   return (
//     <button
//       className={tw`bg-blue-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default`}
//       onClick={onClick}
//       {...rest}
//     >
//       {children}
//     </button>
//   )
// }

// function WinnerButton({ children, ...rest }: { children: string }) {
//   return (
//     <button
//       className={tw`bg-green-300 border-white rounded border-1 shadow-sm text-4xl font-light w-24 h-24 text-center text-white cursor-default`}
//       disabled
//       {...rest}
//     >
//       {children}
//     </button>
//   )
// }

const player = {
  X: 'X',
  O: 'O',
  EMPTY: '-',
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

  if (tiles.every((t) => t !== player.EMPTY)) return GameStatuses.DRAW

  return determineCurrentPlayer(tiles) === player.X
    ? GameStatuses.X_TURN
    : GameStatuses.O_TURN

  function threeInARow(x: number, y: number, z: number) {
    if (
      tiles[x] === player.EMPTY ||
      tiles[y] === player.EMPTY ||
      tiles[z] === player.EMPTY
    )
      return false

    return tiles[x] === tiles[y] && tiles[y] === tiles[z]
  }
}
