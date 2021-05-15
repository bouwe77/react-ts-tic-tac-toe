// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import App from './App'

// /*
// Numbering of the buttons:
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// */

// function clickButton(screen, buttonNr, expectedButtonText) {
//   let button = screen.getByRole('button', {
//     name: 'button-' + buttonNr,
//   })
//   userEvent.click(button)
//   expect(button).toHaveTextContent(expectedButtonText)
// }

// function assertGameStatus(screen, expectedGameStatus) {
//   var regex = new RegExp(expectedGameStatus, 'i')
//   const element = screen.getByText(regex)
//   expect(element).toBeInTheDocument()
// }

// test('Player X wins', () => {
//   render(<App />)

//   const title = screen.getByText(/Tic Tac Toe/i)
//   expect(title).toBeInTheDocument()

//   assertGameStatus(screen, "Player X's turn")

//   clickButton(screen, 1, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 4, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 2, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 5, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 3, 'X')

//   assertGameStatus(screen, 'Player X wins')
// })

// test('Player O wins', () => {
//   render(<App />)

//   const title = screen.getByText(/Tic Tac Toe/i)
//   expect(title).toBeInTheDocument()

//   assertGameStatus(screen, "Player X's turn")

//   clickButton(screen, 1, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 4, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 2, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 5, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 9, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 6, 'O')

//   assertGameStatus(screen, 'Player O wins')
// })

// test('Draw (no-one wins)', () => {
//   render(<App />)

//   const title = screen.getByText(/Tic Tac Toe/i)
//   expect(title).toBeInTheDocument()

//   assertGameStatus(screen, "Player X's turn")

//   clickButton(screen, 1, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 4, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 2, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 3, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 5, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 8, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 6, 'X')
//   assertGameStatus(screen, "Player O's turn")
//   clickButton(screen, 9, 'O')
//   assertGameStatus(screen, "Player X's turn")
//   clickButton(screen, 7, 'X')

//   assertGameStatus(screen, 'Draw')
// })
