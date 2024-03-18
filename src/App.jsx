import { useState } from 'react';

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
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares)
    setXIsNext(!xIsNext)   /* flips the value of the boolean on the next players turn */

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
The xIsNext boolean toggles between true and false after every move to alternate 
turns between "X" and "O". Here's how the cycle works, assuming "X" starts:

Initially, xIsNext is set to true, indicating it's "X's" turn.

When the first move is made (let's say by "X"), handleClick is executed:
"X" is placed on the board because xIsNext is true.
At the end of handleClick, setXIsNext(!xIsNext) is called. Since xIsNext was true, !xIsNext is false, 
so setXIsNext(false) is executed. Now xIsNext becomes false, indicating it's "O's" turn.

When the second move is made (now by "O"), handleClick is executed again:
"O" is placed on the board because xIsNext is false.
At the end of handleClick, setXIsNext(!xIsNext) is called. This time, since xIsNext was false, !xIsNext is true, 
so setXIsNext(true) is executed. Now xIsNext becomes true again, indicating it's "X's" turn once more.
*/

/* 
THIS IS A A TEST PUSH. NOTHING HERE HAS CHANGED
*/

