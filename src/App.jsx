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
    if (squares[i]) {
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


/* 
PROBLEM:
When you mark a square with a X or an O you aren’t first checking to see if the square already has a X or O value

- This means that when a player marks an X or O the next player can click on the same square the first player clicked on and 
overwrite the X with an O or vice-versa.

SOLUTION:
You can fix this by returning early. You’ll check to see if the square already has a X or an O. 
If the square is already filled, you will return in the handleClick function early—before it tries to update the board state.

v
v
v

Conditional Check: The function starts with a conditional check if (squares[i]). This checks whether the square at index i has already been 
filled ("X" or "O"). If the square is not null (meaning it's already been clicked), the function will return early and do nothing. 
This prevents players from changing the value of a square that has already been filled.

  function handleClick(i) {
    if (squares[i]) {
      return
    }

*/