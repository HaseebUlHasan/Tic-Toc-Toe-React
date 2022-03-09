import './App.css';
import TicTocToe from './TicTocToe';
import TwoPlayerTicTocToe from './TwoPlayerTicTocToe';
import FrontPage from './FrontPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerForm from "./PlayerForm";

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
          <Route path="/TwoPlayerTicTocToe" element={<TwoPlayerTicTocToe />} />
          <Route path="/TicTocToe" element={<TicTocToe />} />
          <Route path="/PlayerForm" element={<PlayerForm /> }/>
      </Routes>
    </BrowserRouter>
  
    </div>
  );
}

export default App;
