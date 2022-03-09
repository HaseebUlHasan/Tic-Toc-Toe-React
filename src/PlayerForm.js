import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";

const PlayerForm = () => {
  const [firstname, setFirstName] = useState("");
  const [secondname, setSecondName] = useState("");
  const navigate = useNavigate();


  return (
    <div>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title> Players Information </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label> First Player Name </label>
            <br />
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <label> Second Player Name </label>
            <br />
            <input
              type="text"
              value={secondname}
              onChange={(e) => setSecondName(e.target.value)}
            />
            <br />
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button
            variant="primary"
           onClick={() =>  navigate("/TwoPlayerTicTocToe" ,  {state : {firstname , secondname}})}
          >
            Start Game
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default PlayerForm;
