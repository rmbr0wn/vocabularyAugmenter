import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

import "../../styles/buttons.css";
import "./form.css";

const Form = (props) => (
  <div className="auth-form-container">
    <h1 className="auth-form-h1"> {props.signedUp ? "Sign In" : "Sign Up"} </h1>
    <form onSubmit={props.handleSubmit} className="auth-form">
      {props.signedUp ?
        <div className="form-container-sign-in">
          <div className="form-field-container">
            <div className="auth-form-field">
              <label className="auth-form-label">E-mail: </label>
              <input type="email"
                required
                name="loginEmail"
                onChange={props.handleChange}
                placeholder="E-mail"
                id="loginEmail"
                className="auth-form-input"
              />
              {

              }
            </div>
            <div className="auth-form-field">
              <label className="auth-form-label">Password: </label>
              <input type="password"
                required
                name="loginPassword"
                onChange={props.handleChange}
                placeholder="Password"
                id="loginPassword"
                className="auth-form-input"
              />
              </div>
              <div>
                {props.errors.loginEmail && <h3 className="form-error-message">{props.errors.loginEmail}</h3>}
                {props.errors.loginPassword && <h3 className="form-error-message">{props.errors.loginPassword}</h3>}
              </div>
            </div>
            <div className="form-button-container">
              <button type="submit" id="loginButton" className="form-button auth-form-button"> Log In </button>
            </div>
            <div className="form-button-container">
              <GoogleLogin
              clientId="272154925137-pkh6c6dhhm79hj8enundingvnsl8vbnl.apps.googleusercontent.com"
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="form-button auth-form-button">Google Login</button>
              )}
              onSuccess={props.googleSuccess}
              onFailure={props.googleFailure}
              buttonText="Login"
              cookiePolicy={"single_host_origin"}
              />
            </div>
          <div className="form-button-container">
            <button type="button" onClick={props.switchFormType} className="form-button auth-form-button"> Create New Account </button>
          </div>
        </div>
        :
        <div className="form-container-sign-up">
          <div className="auth-form-field">
            <label className="auth-form-label">Username: </label>
            <input type="text"
              required
              name="username"
              onChange={props.handleChange}
              placeholder="Username"
              className="auth-form-input"
            />

          </div>
          <div className="auth-form-field">
            <label className="auth-form-label">Email: </label>
            <input type="email"
              required
              name="email"
              onChange={props.handleChange}
              placeholder="E-mail"
              className="auth-form-input"
            />

          </div>
          <div className="auth-form-field">
            <label className="auth-form-label">Password: </label>
            <input type="password"
              required
              name="password"
              onChange={props.handleChange}
              placeholder="Password"
              id="signupPassword"
              ref={props.signupPassword}
              className="auth-form-input"
            />

          </div>
          <div className="auth-form-field">
            <label className="auth-form-label">Confirm Password: </label>
            <input type="password"
              required
              name="confirmPassword"
              onChange={props.handleChange}
              placeholder="Confirm password"
              id="signupConfirmPassword"
              className="auth-form-input"
            />
          </div>
          <div>
            { props.errors.username && <h3 className="form-error-message">{props.errors.username}</h3> }
            { props.errors.email && <h3 className="form-error-message">{props.errors.email}</h3> }
            { props.errors.password && <h3 className="form-error-message">{props.errors.password}</h3> }
            { props.errors.confirmPassword && <h3 className="form-error-message">{props.errors.confirmPassword}</h3> }
          </div>
          <div className="form-button-container">
            <button type="submit" name="submitQuery" className="form-button auth-form-button"> Submit </button>
          </div>
          <div className="form-button-container">
            <hr className="horizontal-rounded-divider"/>
            <p className="existing-account-text">Already have an account?  </p>
            <button type="button" onClick={props.switchFormType} className="form-button auth-form-button"> Sign in </button>
          </div>
        </div>
      }
    </form>
  </div>
);

Form.propTypes = {
  signedUp: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  googleSuccess: PropTypes.func,
  googleFailure: PropTypes.func,
  switchFormType: PropTypes.func,
  signupPassword: PropTypes.object
};

export default Form;
