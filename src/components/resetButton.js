import React from 'react'
import "./ResetButton.css";

export const ResetButton = ({resetBoard}) => {
  return (
    <button className='ResetButton' 
      onClick={resetBoard}>Reset
    
    </button>

  )
}
