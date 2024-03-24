import { useState } from 'react'

function Square({value, onSquareClick}) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button> 
  )
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext) 
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] 
     && squares[a] === squares[b] 
     && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

/* 
const winner = calculateWinner(squares)
This line is declaring a constant variable named winner. It is assigned the return value of the function calculateWinner() when passed the argument squares. 
The squares variable is typically an array representing the current state of the game board (for example, in tic-tac-toe, it might hold values like 'X', 'O', or null). 
The calculateWinner() function presumably checks this board state to determine if there is a winner based on the game rules.

let status
Here, a variable named status is declared but not initialized. This means status is defined but does not yet hold a value. It will be used to hold the status message indicating the current state of the game.

if (winner) {
This line starts an if statement that checks if the winner variable holds a truthy value. In the context of this code, it's checking whether the calculateWinner() function found a winner.
status = "Winner: " + winner
If there is a winner, this line assigns a new value to the status variable. The value is a string that announces the winner of the game, constructed by concatenating "Winner: " with the winner variable. 
If winner is 'X' or 'O', status would become "Winner: X" or "Winner: O", respectively.

} else {
This part of the code is executed if no winner has been determined yet, meaning the winner variable was falsy (likely null or undefined in this context).

status = "Next Player: " + (xIsNext ? "X" : "O") 
In the case where there is no winner yet, this line sets the status variable to indicate who the next player is. The expression (xIsNext ? "X" : "O") 
is a ternary operator that checks the value of the xIsNext variable. If xIsNext is true, it evaluates to "X", indicating that it's X's turn. If xIsNext is false, it evaluates to "O", 
indicating that it's O's turn. Thus, status might become "Next Player: X" or "Next Player: O" based on whose turn it is.
*/
