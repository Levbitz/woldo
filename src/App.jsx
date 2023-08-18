import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./components/GameOver";
import {RiRefreshFill} from 'react-icons/ri'

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [wrongWord, setWrongWord] = useState(false)

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
     // alert("Word not found");
     setWrongWord(true)
 
    }

    if (currWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    console.log(currAttempt);
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }

    console.log(currWord + 'goood');
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };



  useEffect(() => {
    if (wrongWord) {
      const timer = setTimeout(() => {
        setWrongWord(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [wrongWord]);


  return (
    <div className="App">
      <nav style={{
        justifyContent:"space-around",
        display:"flex",
        alignItems:"center"
      }}>
      
      <h1>Bantu Wordle</h1>
      <h1  >
     <RiRefreshFill
     style={{
      marginTop:10
     }}
     onClick={()=>window.location.reload()}
     color='#094c59' size={25}/> 
      </h1>
      
   
        

        
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
        }}
      >
        <div className="game">
       {/* <small>{correctWord}</small>*/}
<dialog style={{
  borderRadius:10,
  
}} open={wrongWord}> Not In Word List

</dialog>
          <Board />

          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
       {/* <small>How to play</small>
        <br />
        <small><small style={{
          background:'green'
        }}>Green background </small> means right letter and right position,
       <small style={{
        background:'#b49f39',
       
       }}> yellow </small>means right letter but wrong postion ,and  <small style={{
        background:'gray'
       }}>gray
       </small> wrong letter
        </small>
      <br />*/}
        {/*<small style={{
          textTransform:"uppercase",
          marginTop:10
        }}>Insipired by Wordle </small>*/}
      </AppContext.Provider>
    </div>
  );
}

export default App;
