
import './App.css';
import {Board} from "./components/Board"
import React, {useState, useEffect} from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { ResetButton } from './components/resetButton';
import { Popup } from "./components/Popup";
import { StatsBoard } from './components/StatsBoard';

function App() {

  const winner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState(true)
  const [score, setScore] = useState({ domScore: 0 , lukeScore: 0})
  const [gameOver, setGameOver] = useState(false)
  const [gameWinner, setWinner] = useState("")
  const [stats, setStats] = useState()
  
  const handleBoxClick = async (boxPos) => {

    const updatedBoard = board.map((val, i) => {
      if (i === boxPos) {
        return currentPlayer === true ? 'domimage' : 'lukeimage';
      } else {
        return val
      }
    })

    const won = checkWinner(updatedBoard)

    if (won) {
      let winner 
      let loser
      if (won === 'lukeimage'){
        winner = 1
        loser = 2
        let {lukeScore} = score;
        lukeScore += 1
        setScore({...score, lukeScore})
        setWinner('luke')
      } else {
        winner = 2
        loser = 1
        let {domScore} = score;
        domScore += 1
        setScore({...score, domScore})
        setWinner('dom')
      }
      const result = {winner, loser}
      const fetchResult = await fetch("http://localhost:8081/insertgame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result)
      });
      console.log("fetch result", fetchResult)
    }

    setBoard(updatedBoard);

    setCurrentPlayer(!currentPlayer);
  }

  const checkWinner = (board) => {
    for(let i = 0; i < winner.length; i++) {
      const [x,y,z] = winner[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true)
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
    setWinner("")
    fetchStats()
  }

const fetchStats = async() => {
  const fetchData = await fetch("http://localhost:8081/fetchStats", {
    method: "GET",
    headers:  {
      "Content-Type": "application/json",
    }
  })
  if (fetchData.status===200) {
    const data = await fetchData.json()
  console.log("data", data)
  setStats(data)
  }
}

useEffect(() => {
  fetchStats()
}, [])

  return (
    <div className="App">
      <ScoreBoard score={score} currentPlayer={currentPlayer}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <Popup gameWinner={gameWinner}/>
      <StatsBoard stats={stats} />
    </div>
  );
}

export default App;
