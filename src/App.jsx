import React, { useRef, useState } from 'react'
import Confetti from 'js-confetti'
import './styles/style.css'
import LabelsPrinter from "./Features/LabelsPrinter"

const confetti = new Confetti()

const App = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    confetti.addConfetti()
    setCount(c => c + 1)
  }

  return (
    <LabelsPrinter />
    // <button className="btn" onClick={handleClick}>
    //   <span role="img" aria-label="react-emoji">⚛️</span> {count}
    // </button>
  )
}


export default App