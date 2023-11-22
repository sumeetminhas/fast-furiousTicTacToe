import React from "react";

export const StatsBoard = (stats, currentPlayer) => {
        const {domStats, lukeStats} = stats;
    return (
        <div className="statsboard">
            <span>luke stats {lukeStats} </span>
            <span>dom stats {domStats} </span>
        </div>
    )

}