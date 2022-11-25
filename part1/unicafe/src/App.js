import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, number }) => (
  <p>
    {text} {number}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  const allStatistics = good + neutral + bad;

  const average = (good - bad) / allStatistics;

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={incrementGood} />
      <Button text="neutral" handleClick={incrementNeutral} />
      <Button text="bad" handleClick={incrementBad} />

      <h2>statistics</h2>
      <Display text="good" number={good} />
      <Display text="neutral" number={neutral} />
      <Display text="bad" number={bad} />
      <Display text="all" number={allStatistics} />
      <Display text="average" number={average} />
      <Display text="positive" number={good / allStatistics} />
    </>
  );
};

export default App;
