import { useState } from 'react'

const Button = ({name, setter}) => {
  return (
    <button onClick={() => setter(prev => prev + 1)}>
      {name}
    </button>
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

      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad)}</p>
        <p>positive {good / (good + neutral + bad)} %</p>
      </div>
    </div>
  )
}

export default App