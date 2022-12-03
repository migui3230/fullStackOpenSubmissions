import { useState, useEffect } from "react";

const AnecdoteWithLargestVote = ({ points, anecdotes }) => {
  // TODO: get index with most points in the points object
  // TODO: display the anecdote and the amount of points for that anecdote
  // TODO: use the useEffect hook to rerender whenever the max votes changes
  const [biggestIndex, setBiggestIndex] = useState(0);

  useEffect(() => {
    const keys = Object.keys(points);
    const largestKey = keys.reduce((a, b) => (points[a] > points[b] ? a : b));

    setBiggestIndex(largestKey);
  }, [biggestIndex, points]);

  return (
    <>
      <h2>Anecdote with most votes</h2>
      {anecdotes[biggestIndex]}
      <p>has {points[biggestIndex]} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const setNewAnecdoteIndex = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteForIndex = () => {
    const copyPoints = { ...points };
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
        <button onClick={voteForIndex}>vote</button>
        <button onClick={setNewAnecdoteIndex}>next anecdote</button>
      </div>

      <br />

      <AnecdoteWithLargestVote points={points} anecdotes={anecdotes} />
    </>
  );
};

export default App;
