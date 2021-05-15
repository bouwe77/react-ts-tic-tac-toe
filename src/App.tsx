import { useState } from 'react'

const initialTiles = () => Array(9).fill(null)

export default function App() {
  const [tiles, setTiles] = useState(initialTiles)

  const gameStatus = determineGameStatus(tiles)
  const gameOver = ![gameStatuses.X_TURN, gameStatuses.O_TURN].includes(
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
    <div
      style={{
        width: '200px',
        margin: 'auto',
        textAlign: 'center',
        border: '1px solid #efefef',
      }}
    >
      <h1>Tic Tac Toe</h1>

      <div style={{ height: '30px' }}>{gameStatus}</div>

      <div style={{ width: '150px', margin: 'auto' }}>
        {tiles.map((tile, index) => (
          <span key={index}>
            <button
              aria-label={`button-${index + 1}`}
              style={{
                width: '50px',
                height: '50px',
                verticalAlign: 'top',
                fontSize: '30px',
              }}
              onClick={() => handleClick(index)}
              disabled={gameOver}
            >
              {tile}
            </button>
          </span>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <button onClick={tryAgain} style={{ fontSize: '20px', width: '150px' }}>
          {gameOver ? 'Try again' : 'Reset'}
        </button>
      </div>
    </div>
  )
}

const player = {
  X: 'X',
  O: 'O',
}

const gameStatuses = {
  X_TURN: "Player X's turn",
  O_TURN: "Player O's turn",
  X_WON: 'Player X wins!!!',
  O_WON: 'Player O wins!!!',
  DRAW: 'Draw...',
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
      return tiles[x] === player.X ? gameStatuses.X_WON : gameStatuses.O_WON
  }

  if (tiles.every((t) => !!t)) return gameStatuses.DRAW

  return determineCurrentPlayer(tiles) === player.X
    ? gameStatuses.X_TURN
    : gameStatuses.O_TURN

  function threeInARow(x: number, y: number, z: number) {
    if (!tiles[x] || !tiles[y] || !tiles[z]) return false
    return tiles[x] === tiles[y] && tiles[y] === tiles[z]
  }
}
