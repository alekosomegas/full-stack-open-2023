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
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{good + neutral + bad}</td></tr>
          <tr><td>average</td><td>{(good - bad) / (good + neutral + bad)}</td></tr>
          <tr><td>positive</td><td>{good / (good + neutral + bad)} %</td></tr>
        </tbody>
      </table>
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
      {(good || neutral || bad) ? 
      <Statistics good={good} neutral={neutral} bad={bad} />
      :
      <p>No feedback given</p>
    }
    </div>
  )
}

export default App