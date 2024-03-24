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

  return (
    <>
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
Setup Possible Winning Lines:
const lines = [...]: This part of the code defines an array called lines. Each element of this array is another array containing three indices. 
These inner arrays represent the eight possible winning lines in a tic-tac-toe board: three rows, three columns, and two diagonals.

Iterate Over the Winning Lines:
for (let i = 0; i < lines.length; i++) {: 
This loop iterates through each set of winning line combinations.

Destructure the Line Indices:
const [a, b, c] = lines[i]: 
This uses array destructuring to assign the indices of the current winning line to the variables a, b, and c. 
Each of these variables represents an index in the squares array where the players' moves are recorded.

Check for a Winner:
if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {: 
This checks if the squares at positions a, b, and c are all filled and are the same (all 'X's or all 'O's). This condition does several things:
squares[a] checks that the square at index a is not null (i.e., it has been filled).
squares[a] === squares[b] checks that the squares at indices a and b are filled with the same symbol.
squares[a] === squares[c] checks that the squares at indices a and c are also filled with the same symbol.
If all these conditions are true, it means all three squares in a line are filled with the same symbol (all 'X's or all 'O's), and thus a player has won.

Return the Winner:
return squares[a]: If a winning condition is met, the function returns the symbol ('X' or 'O') of the winning player.
No Winner Found:

return null: If no winning combinations are found (meaning the loop completes without returning), the function returns null, indicating that there is no winner yet
*/




/* 
Here we're calling the calculateWinner(squares) function in the Board componenets handleClick function to chekc if a player has won.
The calculateWinner(squares) is checked at the same time you check if a user has clicked a square that already has a X or and O
function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return
  }
  */