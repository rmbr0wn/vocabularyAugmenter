import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeUsername } from '../actions/profile.actions.js'

const initialState = { username: ''};

export default function ProfilePage () {
  const[allowUsernameChange, setAllowUsernameChange] = useState(false);
  const[newUsername, setNewUsername] = useState(initialState);
  const[error, setError] = useState(initialState);
  const[displayedUsername, setDisplayedUsername] = useState(false);
  const[updateSuccessful, setUpdateSuccessful] = useState('');
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    if(googleUser){
      let changeRequest = await dispatch(
        changeUsername(newUsername, 'Google', googleUser.result.email)
      );
      let changeError = changeRequest?.response.data.message;
      if(changeError) {
        setError({ username: changeError});
        setUpdateSuccessful('');
      }
      if(!changeError) {
        setError({ username: ''});
        let fetchedMessage = JSON.parse(localStorage.getItem('profile')).message;
        setUpdateSuccessful(fetchedMessage);
      }
    }
    else{
      let changeRequest = await dispatch(
        changeUsername(newUsername, 'Regular', regularUser.result.email)
      );
      let changeError = changeRequest?.response.data.message;
      if(changeError) {
        setError({ username: changeError});
        setUpdateSuccessful('');
      }
      if(!changeError) {
        setError({ username: ''});
        let fetchedMessage = JSON.parse(localStorage.getItem('account')).message;
        setUpdateSuccessful(fetchedMessage);
      }
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

  function displayWelcomeName(){
    if(googleUser){
      setDisplayedUsername(googleUser.result.username);
    }

    else{
      setDisplayedUsername(regularUser.result.username);
    }
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
    else{
      displayWelcomeName();       // Might not need this
    }
  }, []);

  useEffect(() => {
    displayWelcomeName();
  }, [googleUser?.result.username, regularUser?.result.username]);

    return (
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          {googleUser?
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
                {allowUsernameChange?
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
