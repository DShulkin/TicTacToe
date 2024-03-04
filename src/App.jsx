import { useState, useEffect } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    console.log("Value has been updated to:", value);
  }, [value]); // This effect depends on `value`, so it runs whenever `value` changes.

  function handleClick() {
    setValue('x');
    // The new value of `value` will be logged by the useEffect hook, not here.
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}
