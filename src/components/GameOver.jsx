import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
  } = useContext(AppContext);

//alert(correctWord +'corret');
console.log(gameOver);
  return (
    <div className="gameOver">


      <h3>
        {gameOver.guessedWord 
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
        <button
        style={{
          outline:"none",
          border:'none',
          borderRadius:2,
          marginBottom:10,
          color:"#fff",
          background:gameOver.guessedWord ? "green":"red"

          
        }}
        onClick={()=> window.location.reload()}> {gameOver.guessedWord? "Play" : "Try"} Again</button>
    </div>
  );
}

export default GameOver;
