import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Acnedotes = ({ text, vote }) => {
  if (vote === '') {
    return <div><p>{text}</p></div>
  } else {
    return <div><p>{text}</p><p>has {vote} votes</p></div>
  }
}

const Title = ({ text }) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let iniarr = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(iniarr)
  const [mostvoted, setMostVoted] = useState(0)

  const handleNext = () => {
    let totalAnecdotes = anecdotes.length
    let numeroRandom = Math.floor(Math.random() * totalAnecdotes);
    setSelected(numeroRandom)
  }

  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1;
    setPoints(copyPoints)
    //most voted
    const maxVotes = Math.max(...copyPoints);
    const mostVotedIndex = copyPoints.indexOf(maxVotes);
    setMostVoted(mostVotedIndex);
  }
  return (
    <div>
      <Title text={'Anecdote of the day'}></Title>
      <Acnedotes text={anecdotes[selected]} vote={points[selected]}></Acnedotes>
      <Button onClick={handleNext} text='Next anecdotes'></Button>
      <Button onClick={handleVote} text='Vote'></Button>
      <Title text={'Anecdote with most votes'}></Title>
      <Acnedotes text={anecdotes[mostvoted]} vote={''}></Acnedotes>
    </div>
  )
}

export default App