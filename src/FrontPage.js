import React , {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button , Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const FrontPage = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

  return (
       <div >
       
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
             Tic Toe Toe Game 
          </Typography>
        </Toolbar>
      </AppBar>
    </Box> 
    <h1> Tic Toc Toe Game</h1>  
    
    <br /> <br /> <br /> <br /><br /><br /><br /><br />

       <div> 
       <Button variant="primary" onClick={() => setShow(true)}>
        Start Tic Toc Toe Game
      </Button>
           
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
             Tic Toc Toe Game Choices
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style= {{margin :"30px" , marginLeft : "80px"}}>
        <Button variant="primary" onClick={() => navigate("/PlayerForm")}>
           Player Vs Player
      </Button> {"        "}
      <Button variant="primary" onClick={() => navigate("/TicTocToe")}>
         Player Vs Computer
      </Button>
          
        </Modal.Body>
      </Modal>
       </div>
      
    </div>
  )
}

export default FrontPage;

