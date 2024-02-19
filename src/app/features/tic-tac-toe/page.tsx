"use client";
import { useState } from "react";

import Board from "@/src/components/Board";

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string>) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  return (
    <div className="c-entry-card">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />;
      <ol></ol>
    </div>
  );
};

export default Game;

//TODO: https://react.dev/learn/tutorial-tic-tac-toe#adding-time-travel
