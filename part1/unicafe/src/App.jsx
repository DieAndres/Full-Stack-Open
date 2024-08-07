import { useState } from 'react'


const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return <tr>
    <th>{text}</th>
    <th>{value}</th>
  </tr>
}
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total
  if (total === 0) {
    return <h4>No feedback given </h4>
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={total} />
        <StatisticLine text={'average'} value={average} />
        <StatisticLine text={'positive '} value={positive + '%'} />
      </table>
    </>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={() => setGood(good + 1)} ></Button>
      <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} ></Button>
      <Button text={'bad'} onClick={() => setBad(bad + 1)} ></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App