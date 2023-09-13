import React from "react";
import {Box} from "./Box"
import "./Board.css"

export const Board = ({ board, onClick }) => {
    return (
        <div className="board">
            {board.map((val, i) => {
                return <Box key={i} value={val} onClick={() => val === null && onClick(i)}
                />
            })}
            
        </div>
    )
}

