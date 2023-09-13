import React, { useMemo } from "react";
import "./Box.css";
import dom from "../dom.jpg";
import luke from "../luke.jpg";

export const Box = ({value, onClick }) => {
    const style = value === "X" ? "box dom" : "box luke";
    const image = useMemo(() => {
        if (value === 'domimage') {
            return <img src={dom} className="dom img-behave" alt="dom" />
        }
        if (value === 'lukeimage') {
            return <img src={luke} className="luke img-behave" alt="luke" />
        }
    }, [value])

    return (
        <button className={style} onClick={onClick}>
            {image}
        </button>
    )
}