import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = { username: '', email: '', password: '', confirmPassword: '' };
const API = axios.create({ baseURL: 'http://localhost:5000' });

const signIn = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await API.post('/user/sign-in', formData);

    dispatch({ type: 'AUTH', data });

    navigation('/');
  } catch (error) {
    console.log("There was an error when signing in: " + error);
  }
}

const signUp = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await API.post('/user/sign-up', formData);

    dispatch({ type: 'AUTH', data });

    navigation('/');
  } catch (error) {
    console.log("There was an error when signing up: " + error);
  }
}

export default function Auth () {
  const [signedUp, setSignedUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if(signedUp) {
      dispatch(signIn(formData, navigate))
    } else {
      dispatch(signUp(formData, navigate))
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onClick(e) {
    setSignedUp(!signedUp);
  }

  async function googleSuccess (res) {
    console.log(res);
    console.log("Success!");
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  function googleFailure(error) {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later.');
  }

// Note: When refactoring, consider turning the repeated form div code below
// into a function/class in an external file.
  return(
    <div>
      <h3> {signedUp ? "Sign In" : "Sign up"} </h3>
      <form onSubmit={handleSubmit}>
        {signedUp ?
          <div className="form-container-sign-in">
            <div>
              <GoogleLogin
                clientId="272154925137-pkh6c6dhhm79hj8enundingvnsl8vbnl.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                buttonText="Login"
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="form-field">
              <label>E-mail: </label>
              <input type="text"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Password: </label>
              <input type="password"
                required
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-button-container">
              <input type="submit" value="Log In"/>
            </div>
            <div>
              <button type="button" onClick={onClick}> Create New Account </button>
            </div>
          </div>
          :
          <div className="form-container-sign-up">
            <div className="form-field">
              <label>Username (optional): </label>
              <input type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Email: </label>
              <input type="text"
                required
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Password: </label>
              <input type="password"
                required
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Repeat Password: </label>
              <input type="password"
                required
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>
            <div className="form-button-container">
              <input type="submit"/>
            </div>
            <div>
              <label>Already have an account?  </label>
              <button type="button" onClick={onClick}> Sign in </button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}
