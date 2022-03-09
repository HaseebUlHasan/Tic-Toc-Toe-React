import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';


const TicTocToe = () => {
  const [cells, setcells] = useState(new Array(9).fill(null));
  const [winning, setWinning] = useState(null);
  const [style,setStyle] = useState([]);
  

  console.log(cells, "cells");
  console.log(winning, "winning");

  useEffect(() => {
    const Computer = cells.filter((cell) => cell !== null).length % 2 === 1;
    const EmptyCells = cells.map((cell, index) => cell === null ? index : null);
  
    const ComputerMove = (num) => { 
      let newcells = cells;
      newcells[num] = "O" ? "X" : "O";
      setcells([...newcells]);
    }; 

    if (Computer) {
      const random = EmptyCells[Math.ceil(Math.random() * EmptyCells.length)];
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
      
    for (let i = 0; i < Win.length; i++) {
      const [a, b, c] = Win[i];
      if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
         setStyle(Win[i]);
        return setWinning(cells[a]);
      }
    } 
  }, [cells]);

  
  

  const ClickHandle = (num) => {
    const newcells = cells.slice();
    if (newcells[num] || winning) {
      return;
    }
    const Player = cells.filter((cell) => cell !== null).length % 2 === 0;
    if (Player) {
      let newcells = cells;
      newcells[num] = "X" ? "O" : "X";
      setcells([...newcells]);
    }
  };

  const Restart = () => {
    setWinning(null);
    setcells(Array(9).fill(null));
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
      {winning &&  (
        <>
          <h3>{winning} is the Winner</h3>
          <Button variant="outline-secondary" onClick={() => Restart ()}> Restart Game </Button>
        </>
      )}
      
      

    </div>
  );
};

export default TicTocToe;
