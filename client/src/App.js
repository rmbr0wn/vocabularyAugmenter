import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import WordExplorer from "./components/WordExplorer/WordExplorer";
import ListsPage from "./components/Lists/ListsPage";
import store from "./reducers/store.js";

function App () {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<HomePage/>}/>
              <Route path="/auth" element={<Auth/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/explore" element={<WordExplorer/>}/>
              <Route path="/lists" element={<ListsPage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
