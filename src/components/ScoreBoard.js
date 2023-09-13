import React from 'react'
import "./ScoreBoard.css"

export const ScoreBoard = ({score, currentPlayer}) => {
    const {domScore, lukeScore} = score;
  return (
    <div className='scoreboard'>
        <span>For family: {domScore}</span>
        <span>Luke: {lukeScore}</span>
        </div>
  )
}
