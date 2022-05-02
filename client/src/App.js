import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import Navbar from "./components/navbar.component";
import HomePage from "./components/homePage.component";
import Auth from "./components/auth.component";
import WordExplorer from "./components/wordExplorer.component";
import ProfilePage from "./components/profilePage.component"
import { reducers } from "./reducers/index.reducer";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<HomePage/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/explore" element={<WordExplorer/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
