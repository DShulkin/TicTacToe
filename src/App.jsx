import { useState } from 'react'

function Square({value, onSquareClick}) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button> 
  )
}

function Board({xIsNext, squares, onPlay}) {
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
    onPlay(nextSquares)
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
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
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

---- The Game() component is the new top level component. It will store the history of each square array. 

----- NOTE: Just like the square component is lifted into the Board() component, we will lift state into the Game() component.

----- This gives the Game component full control over the Board’s data and lets it instruct the Board to render previous turns from the history.


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

     ---- Were storing each past version of the squares arrary
          The history array represents all board states, from the first to the last move, and has a shape like this:

          [
          // Before first move
          [null, null, null, null, null, null, null, null, null],

          // After first move
          [null, null, null, null, 'X', null, null, null, null],

          // After second move
          [null, null, null, null, 'X', null, null, null, 'O'],
          // ...
        ]

---- setHistory is a function that allows you to update history. When you call setHistory with a new value, it updates history 
     to that new value and re-renders the component with the updated state.


history[history.length - 1]
Renders the squares for the current move, by reading the last squares array from the history.

---- This part calculates the index of the last element in the history array.
---- The square brackets [ ] are used for accessing an element within the history array. 
---- Since array indices are zero-based, the index of the last element is one less than the length of the array.


const currentSquares
Renders the squares for the current move by reading the last squares array from the history.
The current state of the game board is assigned to the currentSquares constant. 
This variable holds the array that represents the current layout 
of the Tic-Tac-Toe board.


function Board({xIsNext, squares, onPlay})}
Here the Board() component is controlled by the three props it recieves.
The Board() will call the new onPlay function with the updated squares array when a player makes a move.

---- Notice the first two lines of the Board function that call useState have been removed.
     Because that has been done, we are also replacing the setSquares and SetXIsNext call in the handClick in 
     the Board() with a single call to the onPlay function so that Game() can update the Board when a user
     clicks a square.
---- The Board passes the updated squares array to onPlay
     ---- For example. If the player clicked on the top left square, the fist squares array stored looks like this:
          
         onPlay(nextSquares)
         ['X', null, null, null, null, null, null, null, null]


function handlePlay(nextSquares) { }
The handlePlay function in the Game() updates the Game’s state by triggerering a re-render.


[...history, nextSquares] 
creates a new array that contains all the items in history, followed by nextSquares.
For example, if history is [[null,null,null], ["X",null,null]] and nextSquares is ["X",null,"O"], 
then the new [...history, nextSquares] array will be [[null,null,null], ["X",null,null], ["X",null,"O"]]


setXIsNext(!xIsNext)
toggles xIsNext like the Board used to do.


At this point, state is moved to live in the Game component.
     
*/