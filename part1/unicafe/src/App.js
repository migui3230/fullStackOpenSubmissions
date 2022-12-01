import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value, symbol }) => {
  if (symbol) {
    return (
      <p>
        {text} {value} {symbol}
      </p>
    );
  }
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ feedback }) => {
  const calculations = {
    getAllStatistics: () => feedback.good + feedback.neutral + feedback.bad,
    getAverage: () =>
      (feedback.good - feedback.bad) /
      (feedback.good + feedback.neutral + feedback.bad),
  };

  if (!feedback.good && !feedback.bad && !feedback.neutral) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>statistics</h2>
      <StatisticLine text="good" value={feedback.good} />
      <StatisticLine text="neutral" value={feedback.neutral} />
      <StatisticLine text="bad" value={feedback.bad} />
      <StatisticLine text="all" value={calculations.getAllStatistics()} />
      <StatisticLine text="average" value={calculations.getAverage()} />
      <StatisticLine
        text="positive"
        value={(feedback.good / calculations.getAllStatistics()) * 100}
        symbol={"%"}
      />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state

  // TODO: turn all the useState variables into one object and refactor the calculated variables
  // TODO: create one object for all the state and pass it as props to the child components
  // TODO: find a way to pass in all calculations as a prop to the statistics object

  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const incrementGood = () => {
    setFeedback({
      ...feedback,
      good: feedback.good + 1,
    });
  };

  const incrementNeutral = () => {
    setFeedback({
      ...feedback,
      neutral: feedback.neutral + 1,
    });
  };

  const incrementBad = () => {
    setFeedback({
      ...feedback,
      bad: feedback.bad + 1,
    });
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={incrementGood} />
      <Button text="neutral" handleClick={incrementNeutral} />
      <Button text="bad" handleClick={incrementBad} />
      <Statistics feedback={feedback} />
    </>
  );
};

export default App;
