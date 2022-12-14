import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value, symbol }) => {
  // TODO: create the html table data in here
  if (symbol) {
    return (
      <>
        <td>{text}</td>
        <td>{value}</td>
        <td>{symbol}</td>
      </>
    );
  }

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
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
    // TODO: create the table and table rows in here
    <>
      <h2>statistics</h2>
      <table>
        <tr>
          <StatisticLine text="good" value={feedback.good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={feedback.neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={feedback.bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={calculations.getAllStatistics()} />
        </tr>
        <tr>
          <StatisticLine text="average" value={calculations.getAverage()} />
        </tr>
        <tr>
          <StatisticLine
            text="positive"
            value={(feedback.good / calculations.getAllStatistics()) * 100}
            symbol={"%"}
          />
        </tr>
      </table>
    </>
  );
};

const App = () => {
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
