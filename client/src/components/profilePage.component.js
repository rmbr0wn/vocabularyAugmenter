import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeUsername } from '../actions/profile.actions.js'

const initialState = { username: ''};

export default function ProfilePage () {
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const initialUsername = (googleUser) ? googleUser?.result.username : regularUser?.result.username;
  let navigate = useNavigate();
  const[allowUsernameChange, setAllowUsernameChange] = useState(false);
  const[newUsername, setNewUsername] = useState(initialState);
  const[error, setError] = useState(initialState);
  const[displayedUsername, setDisplayedUsername] = useState(initialUsername);
  const[updateSuccessful, setUpdateSuccessful] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    let userType = (googleUser) ? 'Google' : 'Regular';
    let userEmail = (googleUser) ? googleUser.result.email : regularUser.result.email;
    let storageType = (googleUser) ? 'profile' : 'account';

    let changeUsernameRequest = await dispatch(
      changeUsername(newUsername, userType, userEmail)
    );
    let changeUsernameError = changeUsernameRequest?.response.data.message;

    if(changeUsernameError) {
      setError({ username: changeUsernameError});
      setUpdateSuccessful('');
    }

    if(!changeUsernameError) {
      setError({ username: ''});
      let fetchedMessage = JSON.parse(localStorage.getItem(storageType)).message;
      setUpdateSuccessful(fetchedMessage);
    }
    navigate('/profile');
  }

  function handleChange(e) {
    e.persist();
    validate(e.target.value);

    setNewUsername({ username: e.target.value });
  }

  function showInputField(){
    setUpdateSuccessful('');
    setError('');
    setAllowUsernameChange(!allowUsernameChange);
  }

  function validate(username){
    if(username.length < 4){
      setError({ username: 'The new username must be 4 characters or longer.' });
    } else {
      setError({ username: ''});
    }
  }

  async function updateDisplayedUsername(){
    let storageType = (googleUser) ? 'profile' : 'account';
    let currentUser = JSON.parse(localStorage.getItem(storageType));
    setDisplayedUsername(currentUser?.result.username);
  }

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateDisplayedUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser?.result.username, regularUser?.result.username]);

    return (
      <div id="profile-container">
        <form onSubmit={handleSubmit}>
          {googleUser ?
              <div className="profile-welcome">
                <h2> Welcome to your profile {displayedUsername}!</h2>
                <button type="button" onClick={showInputField}> Change Username </button>
                {allowUsernameChange?
                  <div className="name-change-container">
                    <label> New Username: </label>
                    <input type="text"
                    id="google-username"
                    name="googleUsername"
                    onChange={handleChange}/>
                    <input type="submit" value="Submit"/>
                    {
                      error.username && <h3 className="form-error-message">{error.username}</h3>
                    }
                    {
                      updateSuccessful && <h3 className="form-success-message">{updateSuccessful}</h3>
                    }
                  </div>
                  : null
                }
              </div>
              :
              <div className="profile-welcome">
                <h2> Welcome to your profile {displayedUsername}!</h2>
                <button type="button" id="tester" onClick={showInputField}> Change Username </button>
                {allowUsernameChange ?
                  <div className="name-change-container">
                    <label> New Username: </label>
                    <input type="text"
                    id="regular-username"
                    name="regularUsername"
                    onChange={handleChange}/>
                    <input type="submit" value="Submit"/>
                    {
                      error.username && <h3 className="form-error-message">{error.username}</h3>
                    }
                    {
                      updateSuccessful && <h3 className="form-success-message">{updateSuccessful}</h3>
                    }
                  </div>
                  : null
                }
              </div>
          }
        </form>
      </div>
    );
}
