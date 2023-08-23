import { useState } from 'react'

const Button = ({name, setter}) => {
  return (
    <button onClick={() => setter(prev => prev + 1)}>
      {name}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad)}</p>
        <p>positive {good / (good + neutral + bad)} %</p>
      </div>
    </>
  )
} 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button name={"good"} setter={setGood} />
        <Button name={"neutral"} setter={setNeutral} />
        <Button name={"bad"} setter={setBad} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App