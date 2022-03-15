import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const TicTocToe = () => {
  const [cells, setcells] = useState(new Array(9).fill(null));
  const [winning, setWinning] = useState("");
  const [style,setStyle] = useState([]);
  const [player, setPlayer] = useState("");
  const [playerWin , setPlayerWin] = useState(0);
  const [computerWin , setComputerWin] = useState(0);
  
  const navigate = useNavigate();

  // console.log(cells, "cells"); 
  // console.log(winning, "winning");

  useEffect(() => {
    const Computer = cells.filter((cell) => cell !== null).length % 2 === 1;
    const EmptyCells = cells.map((cell, index) => cell === null ? index : null);
  
    const ComputerMove = (num) => { 
      let newcells = cells;
      newcells[num] = "O";
      setcells([...newcells]);
    }; 

    if (Computer) {
      const random = EmptyCells[Math.floor(Math.random() * EmptyCells.length)];
      console.log(random, "random");
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
      console.log(cells)
    for (let i = 0; i < Win.length; i++) {
      const [a, b, c] = Win[i];
      if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
        setStyle(Win[i]);
        setWinning(cells[a]);
        if (cells[Win[i][0]] === "X") {
          console.log(playerWin + 1 , "Player")
          setPlayer("Player");
          setPlayerWin(playerWin + 1);
        } else {
          setPlayer("Computer");
          setComputerWin(computerWin + 1 )
          console.log(computerWin + 1 , "computer")
        }
       }
      
    } 
  }, [cells]);

  // useEffect(() => {
  //   const Win = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  //     console.log(cells)
  //   for (let i = 0; i < Win.length; i++) {
  //     const [a, b, c] = Win[i];
  //     if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
  //       // setStyle(Win[i]);
  //       // setWinning(cells[a]);
  //       if (cells[Win[i][0]] === "X") {
  //         console.log(playerWin + 1 , "Player")
  //         setPlayer("Player");
  //         setPlayerWin(playerWin + 1);
  //       } else {
  //         setPlayer("Computer");
  //         setComputerWin(computerWin + 1 )
  //         console.log(computerWin + 1 , "computer")
  //       }
  //     } }
  // }, [playerWin] )
  

  const ClickHandle = (num) => {
    const newcells = cells.slice();
    if (newcells[num] || winning) {
      return;
    }
    const Player = cells.filter((cell) => cell !== null).length % 2 === 0;
    if (Player ) {
      let newcells = cells;
      newcells[num] = "X";
      setPlayer("Player");
      setcells([...newcells]);
    }
  };

  const Restart = () => {
    setWinning(null);
    setcells(Array(9).fill(null));
    setStyle("");
    setComputerWin(0);
    setPlayerWin(0);
  };

  const Cells = ({ num }) => {
    return <td onClick={() => ClickHandle(num)}
    style={{backgroundColor : (winning !== '' && style.includes(num)) && 'grey'  , 
    color : (winning !== "" && style.includes(num)) && "white"}}> 
    {cells[num]} </td>;
  };

  return (
    <div>
      
      <h2> Tic Toc Toe Game  </h2>
      <h3> Computer Vs Player</h3>

      <h5> Player : {playerWin} </h5>
      <h5> Computer : {computerWin} </h5>

      <div className="container">
        <table cellSpacing="0">
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
    <br /> <br />

      {winning &&  (
        <>
          <h3>{player} is the Winner</h3>
          <Button variant="outline-secondary" onClick={() => Restart()}> 
          Restart Game 
          </Button> <br />  <br />
        </>
      )}
       
       

      <div >   
        <Button variant="outline-primary" onClick={() => navigate("/")}>
         Back to Front Page
      </Button>
      </div>
      

    </div>
  );
};

export default TicTocToe;
