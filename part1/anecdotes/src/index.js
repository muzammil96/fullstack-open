import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);

  const votes = Array.apply(null, new Array(anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );

  const [voted, setVoted] = useState(votes);

  const selectRandom = () => {
    let num = Math.floor(Math.random() * anecdotes.length);
    setSelected(num);
  };

  const addVotes = () => {
    const arr = [...voted];
    arr[selected] += 1;
    setVoted(arr);
  };
  console.log(voted);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {voted[selected]} votes</div>
      <button onClick={addVotes}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[voted.indexOf(Math.max(...voted))]}</div>
      <div>has {Math.max(...voted)} votes</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
