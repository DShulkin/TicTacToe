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
    // console.log(squares, "BEFORE: squares")

    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares) // passes nextSquares to the handlePlay function

    // console.log(nextSquares, "AFTER: nextSquares")
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
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext)
    setHistory([...history, nextSquares])
  }
  // console.log(currentSquares, "currentSquares")
  // console.log(history, "history")

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

        The squares prop in the Board component holds the value of currentSquares from the Game component. 
        Passing State as Prop: When you pass currentSquares as squares to the Board component, you are effectively making 
        the current state of the game board (held in currentSquares) accessible to the Board component under the name squares.

        Use of squares in Board: Inside the Board component, this prop (squares) is then used to render each Square component. 
        Each square's value (either "X", "O", or null) is determined by the respective element in the squares array. 



        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        Prop Assignment: In the Game component, the handlePlay function is assigned to the onPlay prop of the Board component:
        This means that within the Board component, onPlay is essentially a reference to the handlePlay function defined in the Game component.


        onPlay(nextSquares);
        When onPlay() is called within the Board component, it is effectively invoking the handlePlay 
        function with nextSquares as the argument. This connection between onPlay and handlePlay is 
        established through the prop passing mechanism.
        Calling onPlay: Inside the Board component, whenever a valid move is made (the square is unoccupied and there’s no winner), the handleClick 
        function creates the nextSquares array (which reflects the new state of the board after the move) and then calls onPlay with the array above:

        onPlay adds the following 'nextSquares' array to to the handlePlay function which then
        stores the nextSquares array into 'history' via setHistory([...history, nextSquares]) 

        NOTE:
        The invocation onPlay(nextSquares) is effectively the same as handlePlay(nextSquares)


        function handlePlay(nextSquares) {
        setHistory([...history, nextSquares]);
        setXIsNext(!xIsNext);
        Function Execution: As a result, back in the Game component, handlePlay is executed with the provided nextSquares:
        This function then updates the game’s history with the new board state and toggles the player turn.


*/