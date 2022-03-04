import React, { useState } from "react";

const TicTocToe = () => {
  const [turns, setTurns] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  
  const ClickHandle = (num) => {
    let chance = [...cells];

    if (turns === "X") {
      chance[num] = "X";
      setTurns("O");
    } else {
      chance[num] = "O";
      setTurns("X");
    }
    console.log(chance, "chance");
    Winner(chance);
    setCells(chance);
  };

  const Winner = (chance) => {
    let lines = {
      Line: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let line in lines) {
      lines[line].forEach((pattern) => {
        if (
          chance[pattern[0]] === chance[pattern[1]] &&
          chance[pattern[1]] === chance[pattern[2]]
        ) {
          setWinner(chance[pattern[0]]);
        }
      });
    }
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cells = ({ num }) => {
    return <td onClick={() => ClickHandle(num)}> {cells[num]} </td>;
  };

  return (
    <div>
      <h2> Tic Toc Toe Game </h2>
      Turn: {turns}
      <div className="container">
        <table>
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
      {winner && (
        <>
          <p>{winner} is the winner!</p>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default TicTocToe;
