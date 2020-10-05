import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return <div>no feedback given</div>;
  } else {
    const average = (good * 1 + bad * -1) / all;
    return (
      <>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={isNaN(average) ? 0 : average} />
            <Statistic text="positive" value={(good / all) * 100 + "%"} />
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Header text="statistic" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
