import React from "react";
import "./StatsBoard.css"

export const StatsBoard = ({ stats }) => {
    return (
        <div className="statsboard">
            {stats?.map(stat => 
                <div className="stat">
                    Name: {stat.player_name}
                    Wins: {stat.Wins}
                    Losses: {stat.Losses}
                </div>
                )}
        </div>
    )

}