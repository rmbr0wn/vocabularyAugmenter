import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import "./navbar.css";
import "../../styles/formbuttons.css";

export default function Navbar () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")));
  const googleUser = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = "./icons/profile-avatar.png";
  const siteLogo = "./VocabAugmenter.png";

  function logOut () {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  }

  function logIn () {
    navigate("/auth");
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
         logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem("account")));
  }, [user?.token, location]);

  useEffect(() => {
    if (location.pathname !== "/explore" && localStorage.getItem("thesaurus")) {
      localStorage.removeItem("thesaurus");
    }
  }, [location]);

  // This is essentially a cookie/expiry time for google users.
  useEffect(() => {
    if (googleUser && !user) {
      logOut();
    }
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <ul className="nav-link-list">
          <li>
            <img src={siteLogo} alt="0" width="100" height="100" className="nav-logo"/>
          </li>
          <li>
            <Link to='/' className="nav-link nav-text-link">Home</Link>
          </li>
          <li>
            <Link to='/lists' className="nav-link nav-text-link">Word Lists</Link>
          </li>
          <li>
            <Link to='/explore' className="nav-link nav-text-link">Word Explorer</Link>
          </li>
          <li>
            <Link to='/quizzes' className="nav-link nav-text-link">Quizzes</Link>
          </li>
        </ul>
        { user? (
          <div className="nav-button-container">
            <div className="login-button-container">
              <button onClick={logOut} className="form-button nav-link"> Logout</button>
            </div>
            <div>
              <Link to='/profile'>
                <img src={defaultAvatar} alt="0" width="35" height="35" className="nav-avatar"/>
              </Link>
            </div>
          </div>
        ) : (
          <div className="nav-button-container login-button-container">
            <button onClick={logIn} className="form-button nav-link"> Login/Signup </button>
          </div>
        )}
      </div>
    </nav>
  );
}
