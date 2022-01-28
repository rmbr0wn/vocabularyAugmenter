import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';

import Navbar from "./components/navbar.component";
import DailyWord from "./components/daily-word.component";
import CreateUser from "./components/create-user.component";
import WordList from "./components/word-list.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<DailyWord/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/list" element={<WordList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
