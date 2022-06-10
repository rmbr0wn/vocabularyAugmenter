import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";

const Form = ({ signedUp, onSubmit, onChange, errors, googleSuccess, googleFailure, onClick }) => (
  <div>
    <h3> {signedUp ? "Sign In" : "Sign up"} </h3>
    <form onSubmit={onSubmit}>
      {signedUp ?
        <div className="form-container-sign-in">
          <div className="form-field">
            <label>E-mail: </label>
            <input type="email"
              required
              name="loginEmail"
              onChange={onChange}
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
              onChange={onChange}
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
              cookiePolicy={"single_host_origin"}
              />
            </div>
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
              onChange={onChange}
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
);

Form.propTypes = {
  signedUp: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  googleSuccess: PropTypes.func,
  googleFailure: PropTypes.func,
  onClick: PropTypes.func
};

export default Form;
