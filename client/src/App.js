import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import React from 'react';

import Navbar from "./components/navbar.component";
import DailyWord from "./components/daily-word.component";
import Auth from "./components/auth.component";
import CreateUser from "./components/create-user.component";
import WordList from "./components/word-list.component";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<DailyWord/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/create-user" element={<CreateUser/>}/>
            <Route path="/list" element={<WordList/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
