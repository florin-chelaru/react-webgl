import React from 'react'
import './App.css'

function App() {
  console.log('re-rendering')
  const [state, setState] = React.useState(0)

  const requestRef = React.useRef<number>(0)
  const previousTimeRef = React.useRef<DOMHighResTimeStamp>(-1)

  const animate = (time: DOMHighResTimeStamp) => {
    if (previousTimeRef.current === -1) {
      previousTimeRef.current = time
    }
    const deltaTime = time - previousTimeRef.current

    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    setState((prevCount) => Math.round(deltaTime * 0.001) % 100)

    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    console.log('calling useEffect')
    requestRef.current = requestAnimationFrame(animate)

    // Cleanup function. If useEffect is called multiple times (which it does if you use
    // React.StrictMode, then this is used to cancel the animation frame request before
    // making a new request.
    return () => {
      console.log('cancelling animation frame')
      cancelAnimationFrame(requestRef.current)
    }
  }, []) // Make sure the effect runs only once

  return <div>{state}</div>
}

export default App
