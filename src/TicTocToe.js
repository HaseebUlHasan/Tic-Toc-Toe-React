import React, { useState, useEffect } from "react";

const TicTocToe = () => {
  const [cells, setcells] = useState(new Array(9).fill(null));
  const [winning, setWinning] = useState(null);

     console.log(cells , "cells")
     console.log(winning , "winning")

  useEffect(() => {
    const ComputerTurn = cells.filter((cell) => cell !== null).length % 2 === 1;
    const EmptyCells = cells.map((cell, index) => cell === null ? index : null);

    const ComputerMove = (num) => {
      let newcells = cells;
      newcells[num] = "O";
      setcells([...newcells]);
    };

    if (ComputerTurn) {
      const random = EmptyCells[Math.ceil(Math.random() * EmptyCells.length)];
      console.log(random , "random")
      ComputerMove(random);
    }
    const Win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < Win.length; i++) {
      const [a, b, c] = Win[i];
      if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
        return setWinning(cells[a]);
      }
    }
  }, [cells]);

  const ClickHandle = (num) => {
    const PlayerTurn = cells.filter((cell) => cell !== null).length % 2 === 0;
    if (PlayerTurn) {
      let newcells = cells;
      newcells[num] = "X";
      setcells([...newcells]);
    }
  };

  const Restart = () => {
    setWinning(null);
    setcells(Array(9).fill(null));
  };

  const Cells = ({ num }) => {
    return <td onClick={() => ClickHandle(num)}> {cells[num]} </td>;
  };

  return (
    <div>
      <h2> Tic Toc Toe Game </h2>

      <div className="container">
        <table cellspacing="0">
          <tbody>
            <tr>
              <Cells num={0} />
              <Cells num={1} />
              <Cells num={2} />
            </tr>
            <tr>
              <Cells num={3} />
              <Cells num={4} />
              <Cells num={5} />
            </tr>
            <tr>
              <Cells num={6} />
              <Cells num={7} />
              <Cells num={8} />
            </tr>
          </tbody>
        </table>
      </div>
      {winning && (
        <>
          <h3>{winning} is the Winner</h3> 
          <button onClick={() => Restart()}> Restart Game </button>
        </>
      )}
    </div>
  );
};

export default TicTocToe;
