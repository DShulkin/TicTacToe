import { useState } from 'react'

function Square({value, onSquareClick}) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button> 
  )
}

function Board() {
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
/*W GAME COMPONENET IN PROGRESS*/
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {

  }

  return (
    <div className="game">
      <div className="board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
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

export default function Game() { }
This tells your index.js file to use the Game component as the top-level component 
instead of your Board component.


const [xIsNext, setXIsNext] = useState(true);
Tracks which player is next.


const [history, setHistory] = useState([Array(9).fill(null)])
The history state is an array of game states, where each game state represents 
the state of the board at a certain point in time. Each element in the history array is an array 
of 9 elements representing the 9 squares (9 null values).

---- Notice how [Array(9).fill(null)] is an array with a single item, which itself is an array of 9 nulls.

---- Uses array destructuring to get two items from the array returned by useState:

---- history is the current state value. It starts as [Array(9).fill(null)], which is an array containing a single element 
     that is an array of 9 null values. This represents the initial state of the game board.

---- setHistory is a function that allows you to update history. When you call setHistory with a new value, it updates history 
     to that new value and re-renders the component with the updated state.


history[history.length - 1]
This expression accesses the last element in the history array, which represents the 
current state of the game. Each move by a player is recorded  as a new state in 
the history, allowing the game to know the current configuration of the game board.

---- This part calculates the index of the last element in the history array.
---- The square brackets [ ] are used for accessing an element within the history array. 
---- Since array indices are zero-based, the index of the last element is one less than the length of the array.


const currentSquares
Renders the squares for the current move by reading the last squares array from the history.
The current state of the game board is assigned to the currentSquares constant. 
This variable holds the array that represents the current layout 
of the Tic-Tac-Toe board.
*/