import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

export default function Navbar () {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("account")));
  const googleUser = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = "./icons/human-blob.png";

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
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/lists'>Word Lists</Link>
          </li>
          <li>
            <Link to='/explore'>Word Explorer</Link>
          </li>
          <li>
            <Link to='/quizzes'>Quizzes</Link>
          </li>
        </ul>
        {user? (
          <div>
            <div>
              <button onClick={logOut}> Logout</button>
            </div>
            <Link to='/profile'>
              <img src={defaultAvatar} alt="0" width="25" height="25"/>
            </Link>
          </div>
        ) : (
          <div>
            <button onClick={logIn}> Login/Signup </button>
          </div>
        )}
      </div>
    </nav>
  );
}