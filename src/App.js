// src/App.js

// import React from 'react';
// import BurgerMenu from './Burger';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <BurgerMenu />
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import Navbar from './Navbar';
// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <Navbar />
//       <section id="home">
//         <h1>Home</h1>
//       </section>
//       <section id="about">
//         <h1>About</h1>
//       </section>
//       <section id="services">
//         <h1>Services</h1>
//       </section>
//       <section id="contact">
//         <h1>Contact</h1>
//       </section>
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import FormComponent from './FormComponent';

// const App = () => {
//   return (
//     <div>
//       <h1>Form Validation</h1>
//       <FormComponent />
//     </div>
//   );
// };

// export default App;



// src/App.js
// src/App.js

import React, { useState } from "react";
import Board from "./Board";
import Modal from "./Modal";
import "./App.css";

const App = () => {
  const [players, setPlayers] = useState({ playerX: "Player X", playerO: "Player O" });
  const [isEditing, setIsEditing] = useState(false);
  const [playerNames, setPlayerNames] = useState({ playerX: "Player X", playerO: "Player O" });
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(squaresCopy);
    if (winner) {
      setWinner(winner === "X" ? players.playerX : players.playerO);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setPlayers(playerNames);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerNames({ ...playerNames, [name]: value });
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="app">
      <div className="players">
        <input
          type="text"
          name="playerX"
          value={playerNames.playerX}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <input
          type="text"
          name="playerO"
          value={playerNames.playerO}
          disabled={!isEditing}
          onChange={handleChange}
        />
        <button onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <Board squares={squares} onClick={handleClick} />
      {winner && <Modal winner={winner} restartGame={restartGame} />}
      <div className="status">
        <p>{`Next player: ${xIsNext ? players.playerX : players.playerO}`}</p>
      </div>
    </div>
  );
};

export default App;
