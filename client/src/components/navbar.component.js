import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

export default function Navbar() {
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAvatar = "/ava.png";

  function logOut(){
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  }

  function logIn(){
    navigate('/auth');
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
         logOut();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, location]);

  return(
    <nav>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/list'>Word List</Link>
          </li>
        </ul>
        <div>
          <img src={defaultAvatar} alt="0" width="25" height="25"/>
        </div>
        {user? (
          <div>
            <button onClick={logOut}> Logout</button>
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
