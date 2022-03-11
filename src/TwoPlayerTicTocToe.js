import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const TwoPlayerTicTocToe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [turns, setTurns] = useState("X");
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winning, setWinning] = useState("");
  const [style, setStyle] = useState([]);
  const [Playername, setPlayerName] = useState(state.firstname);
  const [winPlayername, setwinPlayerName] = useState("");
  const [firstWin, setFirstWin] = useState(0);
  const [secondWin, setSecondWin] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

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
      setwinPlayerName(state.secondname);
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
        setWinning(chance[a]);
        setStyle(Win[i]);
        if (chance[Win[i][0]] == "X") {
          setFirstWin(firstWin + 1);
        } else {
          setSecondWin(secondWin + 1);
        }
        setShow(true);
      }
    }
  };

  const Restart = () => {
    setWinning("");
    setCells(Array(9).fill(null));
    setTurns("X");
    setPlayerName(state.firstname);
    setOScore(0);
    setXScore(0);
    setShow(false);
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
      <br />

      <>
        <Modal show={show} backdrop="static" keyboard={false} onHide = {handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Win Players</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 style = {{color :"blue"}}> {winPlayername} is the Winner</h3>
            <h5> {state.firstname} Win : {firstWin} </h5>
            <h5> {state.secondname} Win : {secondWin} </h5>
            <Button variant="outline-secondary" onClick={() => Restart()}>
              Restart Game
            </Button>
            
          </Modal.Body>
        </Modal>
      </>

      <div>
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default TwoPlayerTicTocToe;
