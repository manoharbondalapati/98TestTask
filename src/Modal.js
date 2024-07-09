// src/Modal.js

// src/Modal.js

import React from "react";


const Modal = ({ winner, restartGame }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{`Winner: ${winner}`}</h2>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
};

export default Modal;
