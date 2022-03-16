import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = { username: '', email: '', password: '', confirmPassword: '' };
const API = axios.create({ baseURL: 'http://localhost:5000' });
let errorMessage = "";

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
    // console.log("There was an error when signing up: " + error);
    // console.log(error.response.data.message);
    // console.log("Status: " + error.response.status);
    errorMessage = await error.response.data.message;
    console.log("In signUp function: " + errorMessage);
    return errorMessage;
  }
}


export default function Auth () {
  const [signedUp, setSignedUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    
    setErrors({
      ...errors,
      email: errorMessage
    })

    if(signedUp) {
      dispatch(signIn(formData, navigate))
    } else {
      dispatch(signUp(formData, navigate))
    }
  }

  function validate(event, name, value) {
    switch (name) {
      case 'username':
        if(value.length <= 3){
          setErrors({
            ...errors,
            username: 'Username must be at least 4 characters long.'
          })
        } else {
          setErrors({
            ...errors,
            username: ''
          });
        }
        break;

      case 'email':
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
          setErrors({
            ...errors,
            email: ''
          });
        } else {
          setErrors({
            ...errors,
            email: 'Invalid e-mail address.'
          })
        }
        break;

      case 'password':
        let repeatPassword = document.getElementById("signupConfirmPassword").value;

        if(repeatPassword){
          if(value === repeatPassword){
            setErrors({
              ...errors,
              confirmPassword: ''
            })
          } else{
            setErrors({
              ...errors,
              confirmPassword: 'The two passwords are not equal.'
            })
          }
        }

        if(value.length < 8){
          if(value.length === 0) {         // Clear message if they delete the password
            setErrors({
              ...errors,
              password: ''
            })
          } else{
            setErrors({
              ...errors,
              password: 'The password must be 8 characters or longer.'
            })
          }
        } else{
          setErrors({
            ...errors,
            password: ''
          })
        }
        break;

      case 'confirmPassword':
        let formPassword = document.getElementById("signupPassword").value;

        if(formPassword){
          if(value === formPassword){
            setErrors({
              ...errors,
              confirmPassword: ''
            });
          } else {
            setErrors({
              ...errors,
              confirmPassword: 'The two passwords are not equal.'
            })
          }
        }
        break;

      default:
        break;
    }

  }

  function handleChange(e) {
    e.persist();

    validate(e, e.target.name, e.target.value);

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
              <input type="email"
                required
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
              />
            </div>
            <div className="form-field">
              <label>Password: </label>
              <input type="password"
                required
                name="password"
                onChange={handleChange}
                placeholder="Password"
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
              <label>Username: </label>
              <input type="text"
                required
                name="username"
                onChange={handleChange}
                defaultValue=""
                placeholder="Username"
              />
              {
                errors.username && <h3 className="form-error-message">{errors.username}</h3>
              }
            </div>
            <div className="form-field">
              <label>Email: </label>
              <input type="email"
                required
                name="email"
                onChange={handleChange}
                placeholder="E-mail"
              />
              {
                errors.email && <h3 className="form-error-message">{errors.email}</h3>
              }
            </div>
            <div className="form-field">
              <label>Password: </label>
              <input type="password"
                required
                name="password"
                onChange={handleChange}
                placeholder="Password"
                id="signupPassword"
              />
              {
                errors.password && <h3 className="form-error-message">{errors.password}</h3>
              }
            </div>
            <div className="form-field">
              <label>Confirm Password: </label>
              <input type="password"
                required
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm password"
                id="signupConfirmPassword"
              />
              {
                errors.confirmPassword && <h3 className="form-error-message">{errors.confirmPassword}</h3>
              }
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
