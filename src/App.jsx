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

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setXIsNext(nextMove % 2 === 0)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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


const [currentMove, setCurrentMove] = useState(0)

  keep track of which step the user is currently viewing. 
  To do this, define a new state variable called 
  currentMove, defaulting to 0

--------------------------------------------------------------------------------------------------

setXIsNext(nextMove % 2 === 0)

    % 2 === 0: This expression is used to check if nextMove is an even number.
    The modulus operator (%) calculates the remainder of the division of nextMove by 2.
    If the remainder is 0 (meaning nextMove is evenly divisible by 2), then the result is true.

    (Sets xIsNext to true if the number that you’re changing currentMove to is even.)

--------------------------------------------------------------------------------------------------


  history.slice(0, currentMove + 1)

    This part extracts a portion of the history array from index 0 up to currentMove + 1. 
    This ensures that we include all previous moves up to the current move.

  NOTE:
    If currentMove is 0, history.slice(0, currentMove + 1) will return the array with the first move (index 0) included.
    If currentMove is 1, history.slice(0, currentMove + 1) will return an array with the first two moves (indexes 0 and 1) included.
    And so on. Therefore, adding + 1 ensures that the slice includes all moves up to and including the current move.
  
  ALT NOTE:
    Here's why the + 1 is necessary:
    If currentMove is 0, history.slice(0, currentMove + 1) will include elements from index 0 up to 0 + 1, which is index 1, ensuring that the first move is included.
    If currentMove is 1, history.slice(0, currentMove + 1) will include elements from index 0 up to 1 + 1, which is index 2, ensuring that both the first and second moves are included.
    And so on.


  [...history.slice(0, currentMove + 1), nextSquares]
  
    The spread operator (...) is used to spread the elements of the sliced history array into a new array. 
    Then, nextSquares is appended to this new array. This results in a new array containing the history of 
    moves up to the current move, followed by the latest move stored in nextSquares.

    So, essentially, nextHistory represents the updated history of moves in the game after a new move (nextSquares) is made.

  --------------------------------------------------------------------------------------------------


  const currentSquares = history[currentMove]

    Retrieves the game board state corresponding to the current move.

    history: 
    This variable holds an array that stores the game board state at different points in time. 
    Each element in this array represents the state of the board at a particular move.

    currentMove: 
    This variable keeps track of which move the game is currently at. It indicates the index 
    in the history array where the current game state is stored.

    history[currentMove]:
    This expression accesses the element in the history array at the index 
    specified by currentMove. This element contains the game board state at the current move.

    const currentSquares: 
    This variable is assigned the value retrieved from history[currentMove], 
    which represents the game board state at the current move. It's named currentSquares, 
    implying that it holds the current state of the squares on the game board.

    So, currentSquares essentially represents the current configuration of the squares 
    on the game board based on the state stored in the history array at the current move. 
    This allows the Board component to render the game board accurately based on the current 
    state of the gam

*/