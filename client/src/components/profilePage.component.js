import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeUsername } from '../actions/profile.actions.js'

const initialState = { username: ''};

export default function ProfilePage () {
  const[allowUsernameChange, setAllowUsernameChange] = useState(false);
  const[newUsernameData, setNewUsernameData] = useState(initialState);
  const[error, setError] = useState(initialState);
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    if(googleUser){
      let changeRequest = await dispatch(
        changeUsername(newUsernameData, 'Google', googleUser.result.email)
      );
      let changeError = changeRequest?.response.data.message;
    }
    else{
      let changeRequest = await dispatch(
        changeUsername(newUsernameData, 'Regular', regularUser.result.email)
      );
      let changeError = changeRequest?.response.data.message;
    }
  }

  function handleChange(e) {
    e.persist();
    validate(e.target.value);

    setNewUsernameData({ username: e.target.value });
  }

  function displayUsernameInput(){
    setAllowUsernameChange(!allowUsernameChange);
  }

  function validate(username){
    if(username.length < 4){
      setError({ username: 'The new username must be 4 characters or longer.' });
    }
    else{
      setError({ username: ''});
    }
  }

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate("/");
      return;
    }
  }, []);

    return (
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          {googleUser?
              <div className="profile-welcome">
                <h2> Welcome to your profile {googleUser.result.username}!</h2>
                <button type="button" onClick={displayUsernameInput}> Change Username </button>
                {allowUsernameChange?
                  <div className="name-change-container">
                    <label> New Username: </label>
                    <input type="text"
                    id="google-username"
                    name="googleUsername"
                    onChange={handleChange}/>
                    {
                      error.username && <h3 className="form-error-message">{error.username}</h3>
                    }
                    <input type="submit" value="Submit"/>
                  </div>
                  : null
                }
              </div>
              :
              <div className="profile-welcome">
                <h2> Welcome to your profile {regularUser.result.username}!</h2>
                <button type="button" id="tester" onClick={displayUsernameInput}> Change Username </button>
                {allowUsernameChange?
                  <div className="name-change-container">
                    <label> New Username: </label>
                    <input type="text"
                    id="regular-username"
                    name="regularUsername"
                    onChange={handleChange}/>
                    {
                      error.username && <h3 className="form-error-message">{error.username}</h3>
                    }
                    <input type="submit" value="Submit"/>
                  </div>
                  : null
                }
              </div>
          }
        </form>
      </div>
    );
}
