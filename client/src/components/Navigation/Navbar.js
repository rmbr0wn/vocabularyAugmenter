import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import "./navbar.css";
import "../../styles/buttons.css";

export default function Navbar () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")));
  const googleUser = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = "./icons/nav-avatar-icon.png";
  const siteLogo = "./VocabularyAugmenterLogo.png";

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
    <nav id="nav-bar">
      <div className="nav-container">
        <ul className="nav-link-list">
          <li className="nav-logo-li">
            <img src={siteLogo} alt="0" className="nav-logo"/>
          </li>
          <li className="nav-route-li">
            <Link to='/' className="nav-link nav-text-link">Home</Link>
          </li>
          <li className="nav-route-li">
            <Link to='/lists' className="nav-link nav-text-link">Word Lists</Link>
          </li>
          <li className="nav-route-li">
            <Link to='/explore' className="nav-link nav-text-link">Word Explorer</Link>
          </li>
          <li className="nav-route-li">
            <Link to='/quizzes' className="nav-link nav-text-link">Quizzes</Link>
          </li>
          { user ? (
            <li className="nav-button-li">
              <div className="nav-button-container">
                <div className="login-button-container">
                  <button onClick={logOut} className="form-button nav-link login-logout-nav"> Logout</button>
                </div>
                <div className="profile-icon-container">
                  <Link to='/profile'>
                    <img src={defaultAvatar} alt="0" className="nav-avatar"/>
                  </Link>
                </div>
              </div>
            </li>
          ) : (
            <li className="nav-button-li">
              <div className="nav-button-container login-button-container">
                <button onClick={logIn} className="form-button nav-link login-logout-nav"> Login/Signup </button>
              </div>
            </li>
          )
          }
        </ul>
      </div>
    </nav>
  );
}
