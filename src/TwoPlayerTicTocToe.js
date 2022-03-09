import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TwoPlayerTicTocToe = () => {
  const [turns, setTurns] = useState("");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winning, setWinning] = useState("");
  const [style,setStyle] = useState([]);
  const [Playername, setPlayerName] = useState("");

  const { state } = useLocation();

  console.log(state, "state");
  console.log(state.firstname, "fn");
  console.log(state.secondname, "fn");

  
  const handleBox = (num) => {
    const chance = cells.slice();
    if (chance[num] || winning) {
      return;
    }
    if (turns === "X") {
      chance[num] = "X";
      setTurns("O");
      setPlayerName(state.firstname);
    } else {
      chance[num] = "O";
      setTurns("X");
      setPlayerName(state.secondname);
    }
    setCells(chance);
    Winning(chance);
  };

  const Winning = (chance) => {
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
      if (chance[a] && chance[a] === chance[b] && chance[b] === chance[c]) {
        setStyle(Win[i]);
        return setWinning(chance[a]); 
      }
    }
  
  };

  const Restart = () => {
    setWinning("");
    setCells(Array(9).fill(null));
    setPlayerName("");
    setTurns("");
  };

  const Back = () => {
    setCells(Array(9).fill(null));
    setPlayerName("");
    setTurns("");
  };

  const Box = ({ num }) => {
    debugger
    return <td onClick={() => handleBox(num)}    
    style={{backgroundColor : (winning !== '' && style.includes(num)) && 'grey' ,
    color : (winning !== "" && style.includes(num)) && "white"}}>
    {cells[num]} </td>;
  };

  return (
    <div>
      <h2> Tic Toc Toe Game </h2>
      <h3 style={{ color: "blue" }}>
        {state.firstname} Vs {state.secondname}
      </h3>
      <div className="container">
        <table cellSpacing="0">
          {Playername} : {turns}
          <tbody>
            <tr>
              <Box num={0} />
              <Box num={1} />
              <Box num={2} />
            </tr>
            <tr>
              <Box num={3} />
              <Box num={4} />
              <Box num={5} />
            </tr>
            <tr>
              <Box num={6} />
              <Box num={7} />
              <Box num={8} />
            </tr>
          </tbody>
        </table>
      </div>
       <br/>
       {!winning && (
      <Button variant="outline-primary" onClick={() => Back()}>
         Back
      </Button>)}

      {winning && (
        <>
          <h3> {Playername} is the Winner</h3>
          <Button variant="outline-secondary" onClick={() => Restart()}>
            Restart Game
          </Button>
        </>
      )}
    </div>
  );
};

export default TwoPlayerTicTocToe;
