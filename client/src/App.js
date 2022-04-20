import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import Navbar from "./components/navbar.component";
import DailyWord from "./components/dailyWord.component";
import Auth from "./components/auth.component";
import WordList from "./components/wordList.component";
import Profile from "./components/profile.component"
import { reducers } from "./reducers/index.reducer";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<DailyWord/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/list" element={<WordList/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
