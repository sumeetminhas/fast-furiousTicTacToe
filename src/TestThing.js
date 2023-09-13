import React, { useState } from 'react'

export default function TestThing ({ clickHandler }) {
    const [things] = useState(new Array(10).fill(null).map((_, i) => (
        <div key={i} onClick={clickHandler}>test div #{i}</div>
    )))

    return (
        <div>
            <div>TEST THING</div>
            {things}
        </div>
    )
}