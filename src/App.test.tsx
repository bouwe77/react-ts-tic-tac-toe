import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

/*
Numbering of the buttons:
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
*/

async function clickButton(buttonNr: number, expectedButtonText: string) {
  let button = screen.getByRole('button', {
    name: 'button-' + buttonNr,
  })
  userEvent.click(button)
  await assertButtonContent(buttonNr, expectedButtonText)
}

async function assertButtonContent(
  buttonNr: number,
  expectedButtonText: string,
) {
  let button = screen.getByRole('button', {
    name: 'button-' + buttonNr,
  })
  await waitFor(() => expect(button).toHaveTextContent(expectedButtonText))
}

function assertGameStatus(expectedGameStatus: string) {
  var regex = new RegExp(expectedGameStatus, 'i')
  const element = screen.getByText(regex)
  expect(element).toBeInTheDocument()
}

test('Start and reset game', async () => {
  render(<App />)

  const title = screen.getByText(/Tic Tac Toe/i)
  expect(title).toBeInTheDocument()

  // The Try again and Reset buttons should not yet be there.
  const tryAgainButton = screen.queryByRole('button', {
    name: 'Try again',
  })
  expect(tryAgainButton).not.toBeInTheDocument()
  let resetButton = screen.queryByRole('button', {
    name: 'Reset',
  })
  expect(resetButton).not.toBeInTheDocument()

  await assertButtonContent(0, '-')
  await assertButtonContent(1, '-')
  await assertButtonContent(2, '-')
  await assertButtonContent(3, '-')
  await assertButtonContent(4, '-')
  await assertButtonContent(5, '-')
  await assertButtonContent(6, '-')
  await assertButtonContent(7, '-')
  await assertButtonContent(8, '-')

  await clickButton(0, 'X')

  // The game has started, so the Reset button should be visible now.
  resetButton = screen.getByRole('button', {
    name: 'Reset',
  })
  userEvent.click(resetButton)

  // After resetting, all buttons should be cleared again.
  await assertButtonContent(0, '-')
  await assertButtonContent(1, '-')
  await assertButtonContent(2, '-')
  await assertButtonContent(3, '-')
  await assertButtonContent(4, '-')
  await assertButtonContent(5, '-')
  await assertButtonContent(6, '-')
  await assertButtonContent(7, '-')
  await assertButtonContent(8, '-')
})

test('Player X wins', async () => {
  render(<App />)

  assertGameStatus("Player X's turn")

  await clickButton(0, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(3, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(4, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(2, 'X')

  assertGameStatus('Player X wins')

  const tryAgainButton = screen.queryByRole('button', {
    name: 'Try again',
  })
  expect(tryAgainButton).toBeInTheDocument()
})

test('Player O wins', async () => {
  render(<App />)

  assertGameStatus("Player X's turn")

  await clickButton(0, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(3, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(4, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(8, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(5, 'O')

  assertGameStatus('Player O wins')

  const tryAgainButton = screen.queryByRole('button', {
    name: 'Try again',
  })
  expect(tryAgainButton).toBeInTheDocument()
})

test('Draw (no-one wins)', async () => {
  render(<App />)

  assertGameStatus("Player X's turn")

  await clickButton(0, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(3, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(1, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(2, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(4, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(7, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(5, 'X')
  assertGameStatus("Player O's turn")
  await clickButton(8, 'O')
  assertGameStatus("Player X's turn")
  await clickButton(6, 'X')

  assertGameStatus('Draw')

  const tryAgainButton = screen.queryByRole('button', {
    name: 'Try again',
  })
  expect(tryAgainButton).toBeInTheDocument()
})
