import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

/*
Numbering of the buttons:
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
*/

function clickButton(buttonNr: number, expectedButtonText: string) {
  let button = screen.getByRole('button', {
    name: 'button-' + buttonNr,
  })
  userEvent.click(button)
  expect(button).toHaveTextContent(expectedButtonText)
}

function assertGameStatus(expectedGameStatus: string) {
  var regex = new RegExp(expectedGameStatus, 'i')
  const element = screen.getByText(regex)
  expect(element).toBeInTheDocument()
}

test('Player X wins', () => {
  render(<App />)

  const title = screen.getByText(/Tic Tac Toe/i)
  expect(title).toBeInTheDocument()

  assertGameStatus("Player X's turn")

  clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  clickButton(4, 'O')
  assertGameStatus("Player X's turn")
  clickButton(2, 'X')
  assertGameStatus("Player O's turn")
  clickButton(5, 'O')
  assertGameStatus("Player X's turn")
  clickButton(3, 'X')

  assertGameStatus('Player X wins')
})

test('Player O wins', () => {
  render(<App />)

  const title = screen.getByText(/Tic Tac Toe/i)
  expect(title).toBeInTheDocument()

  assertGameStatus("Player X's turn")

  clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  clickButton(4, 'O')
  assertGameStatus("Player X's turn")
  clickButton(2, 'X')
  assertGameStatus("Player O's turn")
  clickButton(5, 'O')
  assertGameStatus("Player X's turn")
  clickButton(9, 'X')
  assertGameStatus("Player O's turn")
  clickButton(6, 'O')

  assertGameStatus('Player O wins')
})

test('Draw (no-one wins)', () => {
  render(<App />)

  const title = screen.getByText(/Tic Tac Toe/i)
  expect(title).toBeInTheDocument()

  assertGameStatus("Player X's turn")

  clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  clickButton(4, 'O')
  assertGameStatus("Player X's turn")
  clickButton(2, 'X')
  assertGameStatus("Player O's turn")
  clickButton(3, 'O')
  assertGameStatus("Player X's turn")
  clickButton(5, 'X')
  assertGameStatus("Player O's turn")
  clickButton(8, 'O')
  assertGameStatus("Player X's turn")
  clickButton(6, 'X')
  assertGameStatus("Player O's turn")
  clickButton(9, 'O')
  assertGameStatus("Player X's turn")
  clickButton(7, 'X')

  assertGameStatus('Draw')
})
