import { useState } from 'react';

function Square({value, onSquareClick}) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button> 
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    const nextSquares = squares.slice()
    nextSquares[i] = 'X'
    setSquares(nextSquares)
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
Now you can again add X’s to any square on the board by clicking on them.
But this time all the state management is handled by the Board component.
*/ 



/*
The problem starts when you change the code to onSquareClick={handleClick(0)}.
Here, handleClick(0) is called immediately as the Board component renders, not when 
a Square is clicked. This direct call changes the state, leading to a re-render of the 
Board component, which calls handleClick(0) again, and so on, creating an infinite loop.
*/ 




/*
The corrected approach, involves using arrow functions: onSquareClick={() => handleClick(0)}. 
This change ensures that handleClick(0) is not called during the rendering process. 
Instead, you're passing a new function that, when triggered by a click event, calls handleClick(0). 
This function is created anew during each render but does not execute handleClick(0) until a Square is actually clicked.
*/ 




/* 
HOW THIS WORKS AS A WHOLE CURRENTLY:
State handling is in the Board component, the parent Board component passes props to the child Square components 
so that they can be displayed correctly. When clicking on a Square, the child Square component now asks the parent Board component to update 
the state of the board. When the Board’s state changes, both the Board component and every child Square re-renders automatically. 
Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
*/




/* 
HOW THIS WORKS LINE BY LINEv

import { useState } from 'react';
This line imports the useState hook from the React library. 
Hooks are functions that let you “hook into” React state and lifecycle features from function components.


function Square({value, onSquareClick}) {
Defines a functional component named Square. This component takes props value and onSquareClick. 
value will be used to display the value of the square ('X', 'O', or null), and onSquareClick is a function 
that will be called when the square is clicked.


return (
Starts the return statement of the Square component.


<button className="square" onClick={onSquareClick}>
Returns a button element with a class name "square". 
It also sets an onClick event handler to the onSquareClick function passed in through the props.


{value}
This displays the value prop inside the button. 
This will be the content of the square ('X', 'O', or null).


</button> )
Closes the button element and the return statement of the Square component.


export default function Board() {
Defines and exports a functional component named Board. 
This is where the state of the tic-tac-toe board and the logic of the game will be managed.

const [squares, setSquares] = useState(Array(9).fill(null))
Initializes the state squares with an array of 9 null elements. 
This represents the 9 squares of the tic-tac-toe board, initially empty. 
setSquares is the function that will be used to update this state.


function handleClick(i) {
Defines a function named handleClick, which takes an index i. 
This function updates the state of the board when a square is clicked.


const nextSquares = squares.slice()
Creates a shallow copy of the squares array to ensure immutability. 
Changes should be made to this copy rather than the original state directly.


nextSquares[i] = 'X'
Sets the value of the square at the index i to 'X'. In a full game, 
this would likely alternate between 'X' and 'O', depending on the current player, 
but in this simplified version, it always sets to 'X'.

setSquares(nextSquares)
Updates the squares state with the new array where one of the values has been changed to 'X'.

*/