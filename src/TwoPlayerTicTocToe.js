import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const TwoPlayerTicTocToe = () => {
  const { state } = useLocation();
  const [turns, setTurns] = useState("X");
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winning, setWinning] = useState("");
  const [style, setStyle] = useState([]);
  const [Playername, setPlayerName] = useState(state.firstname);
  const [winPlayername, setwinPlayerName] = useState("");
  const [firstWin , setFirstWin] = useState({X : 0});
  const [secondtWin , setSecondWin] = useState({O : 0});
  const navigate = useNavigate();

 
 
  const handleBox = (num) => {
    const chance = cells.slice();
    if (chance[num] || winning) {
      return;
    }
    if (turns === "X") {
      chance[num] = "X";
      setTurns("O");
      setXScore(xScore + 1);
      setPlayerName(state.secondname);
      setwinPlayerName(state.firstname);
      
    } else {

      chance[num] = "O";
      setOScore(oScore + 1);
      setPlayerName(state.firstname);
      setwinPlayerName(state.secondname)
      setTurns("X");
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
        setFirstWin ({...firstWin , X : firstWin.X + 1})
        setSecondWin ({...secondtWin , O : secondtWin.O + 1})
        setWinning(chance[a]);
      }
    }
  };
  
  const Restart = () => {
    setWinning("");
    setCells(Array(9).fill(null));
    setTurns("X");
    setPlayerName(state.firstname)
    setOScore(0);
    setXScore(0);
  };

  const Box = ({ num }) => {
    return (
      <td
        onClick={() => handleBox(num)}
        style={{
          backgroundColor: winning !== "" && style.includes(num) && "grey",
          color: winning !== "" && style.includes(num) && "white",
        }}
      >
        {cells[num]}
      </td>
    );
  };

  return (
    <div>
      <h2> Tic Toc Toe Game </h2>
      <h3 style={{ color: "blue" }}>
        {state.firstname} Vs {state.secondname}
      </h3>
      <h5 style={{ color: "red" }}> Score X : {xScore}</h5>
      <h5> Score O : {oScore} </h5>
     
      <h5> {state.firstname} Win : {firstWin.X}</h5>
      <h5> {state.secondname} Win : {secondtWin.O}</h5>
      
      <div className="container">
        <table cellSpacing="0">
          {Playername} : {turns}{" "}
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
      <br />
      {winning && (
        <>
          <h3> {winPlayername} is the Winner</h3>
          <Button variant="outline-secondary" onClick={() => Restart()}>
            Restart Game
          </Button>
          <br /> <br />
        </>
      )}

      <div>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default TwoPlayerTicTocToe;
