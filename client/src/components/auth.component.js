import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth.actions.js';

const initialState = { username: '', email: '', password: '', confirmPassword: '' };

export default function Auth() {
  const [signedUp, setSignedUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if(signedUp) {
      let loginCheck = await dispatch(signIn(formData, navigate));
      let loginError = loginCheck?.response.data.message;

      if(loginError === undefined){
        return;
      }

      if(loginError.includes("email")){
        setErrors({
          ...errors,
          loginEmail: loginError,
          loginPassword: ''
        })
      }

      if(loginError.includes("credentials")){
        setErrors({
          ...errors,
          loginPassword: loginError,
          loginEmail: ''
        })
      }

    } else {
      let registerCheck = await dispatch(signUp(formData, navigate));
      let registerError = registerCheck?.response.data.message;

      if(registerError === undefined){
        return;
      }

      if(registerError.includes("email")){
        setErrors({
          ...errors,
          email: registerError
        })
      }

      if(registerError.includes("username")){
        setErrors({
          ...errors,
          username: registerError
        })
      }
    }
  }

  function validate(name, value) {
    switch (name) {
      case 'username':
        if(value.length <= 3){
          if(value.length === 0){          // Clear error when field is empty
            setErrors({
              ...errors,
              username: ''
            })
          } else {
              setErrors({
                ...errors,
                username: 'Username must be at least 4 characters long.'
              })
          }
        } else {
            setErrors({
              ...errors,
              username: ''
            })
        }
        break;

      case 'email':
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
          setErrors({
            ...errors,
            email: ''
          })
        } else {
            if(value.length === 0){       // Clear error when field is empty
              setErrors({
                ...errors,
                email: ''
              })
            }
            else{
              setErrors({
                ...errors,
                email: 'Invalid e-mail address.'
              })
            }
        }
        break;

      case 'password':
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

        case 'loginEmail':
          if(value.length === 0){
            setErrors({
              ...errors,
              loginEmail: ''
            })
          }
          break;

        case 'loginPassword':
          if(value.length === 0){
            setErrors({
              ...errors,
              loginPassword: ''
            })
          }
          break;

      default:
        break;
    }
  }

  function handleChange(e) {
    e.persist();
    validate(e.target.name, e.target.value);

    if(e.target.name === "loginEmail"){
      setFormData({ ...formData, "email": e.target.value });
      return;
    }
    if(e.target.name === "loginPassword"){
      setFormData({ ...formData, "password": e.target.value });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function switchSignup(e) {
    setSignedUp(!signedUp);
  }

  async function googleSuccess (res) {
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

  return(
    <div>
      <h3> {signedUp ? "Sign In" : "Sign up"} </h3>
      <form onSubmit={handleSubmit}>
        {signedUp ?
          <div className="form-container-sign-in">
            <div className="form-field">
              <label>E-mail: </label>
              <input type="email"
                required
                name="loginEmail"
                onChange={handleChange}
                placeholder="E-mail"
                id="loginEmail"
              />
              {
                errors.loginEmail && <h3 className="form-error-message">{errors.loginEmail}</h3>
              }
            </div>
            <div className="form-field">
              <label>Password: </label>
              <input type="password"
                required
                name="loginPassword"
                onChange={handleChange}
                placeholder="Password"
                id="loginPassword"
              />
              {
                errors.loginPassword && <h3 className="form-error-message">{errors.loginPassword}</h3>
              }
              <div className="form-button-container">
                <input type="submit" value="Log In" id="loginButton"/>
              </div>
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
            </div>
            <div>
              <button type="button" onClick={switchSignup}> Create New Account </button>
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
              <button type="button" onClick={switchSignup}> Sign in </button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}
