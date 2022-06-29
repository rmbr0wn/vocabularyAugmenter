import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

const Form = (props) => (
  <div>
    <h3> {props.signedUp ? "Sign In" : "Sign up"} </h3>
    <form onSubmit={props.onSubmit}>
      {props.signedUp ?
        <div className="form-container-sign-in">
          <div className="form-field">
            <label>E-mail: </label>
            <input type="email"
              required
              name="loginEmail"
              onChange={props.onChange}
              placeholder="E-mail"
              id="loginEmail"
            />
            {
              props.errors.loginEmail && <h3 className="form-error-message">{props.errors.loginEmail}</h3>
            }
          </div>
          <div className="form-field">
            <label>Password: </label>
            <input type="password"
              required
              name="loginPassword"
              onChange={props.onChange}
              placeholder="Password"
              id="loginPassword"
            />
            {
              props.errors.loginPassword && <h3 className="form-error-message">{props.errors.loginPassword}</h3>
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
              onSuccess={props.googleSuccess}
              onFailure={props.googleFailure}
              buttonText="Login"
              cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <div>
            <button type="button" onClick={props.onClick}> Create New Account </button>
          </div>
        </div>
        :
        <div className="form-container-sign-up">
          <div className="form-field">
            <label>Username: </label>
            <input type="text"
              required
              name="username"
              onChange={props.onChange}
              placeholder="Username"
            />
            {
              props.errors.username && <h3 className="form-error-message">{props.errors.username}</h3>
            }
          </div>
          <div className="form-field">
            <label>Email: </label>
            <input type="email"
              required
              name="email"
              onChange={props.onChange}
              placeholder="E-mail"
            />
            {
              props.errors.email && <h3 className="form-error-message">{props.errors.email}</h3>
            }
          </div>
          <div className="form-field">
            <label>Password: </label>
            <input type="password"
              required
              name="password"
              onChange={props.onChange}
              placeholder="Password"
              id="signupPassword"
              ref={props.signupPasswordRef}
            />
            {
              props.errors.password && <h3 className="form-error-message">{props.errors.password}</h3>
            }
          </div>
          <div className="form-field">
            <label>Confirm Password: </label>
            <input type="password"
              required
              name="confirmPassword"
              onChange={props.onChange}
              placeholder="Confirm password"
              id="signupConfirmPassword"
            />
            {
              props.errors.confirmPassword && <h3 className="form-error-message">{props.errors.confirmPassword}</h3>
            }
          </div>
          <div className="form-button-container">
            <input type="submit" name="submitQuery"/>
          </div>
          <div>
            <label>Already have an account?  </label>
            <button type="button" onClick={props.onClick}> Sign in </button>
          </div>
        </div>
      }
    </form>
  </div>
);

Form.propTypes = {
  signedUp: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  googleSuccess: PropTypes.func,
  googleFailure: PropTypes.func,
  onClick: PropTypes.func,
  signupPasswordRef: PropTypes.object
};

export default Form;
