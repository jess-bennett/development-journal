"use client";
import { SetStateAction, useState } from "react";
import { LuSkipBack } from "react-icons/lu";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

import Board from "@/src/components/Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: SetStateAction<number>) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = (
        <>
          {<LuSkipBack />} {move}
        </>
      );
    } else {
      description = <MdOutlineSettingsBackupRestore />;
    }
    return (
      <li key={move}>
        <button className="c-btn" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
  console.log(moves);

  return (
    <div className="c-entry-card">
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        moves={moves}
      />
    </div>
  );
};

export default Game;
