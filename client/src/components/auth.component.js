import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state= {
      showPassword: false,
      signedUp: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.onClick = this.onClick.bind(this);
    this.googleSuccess = this.googleSuccess.bind(this);
    this.googleFailure = this.googleFailure.bind(this);
  }

  onSubmit(e) {

  }

  onChange(e) {

  }

  handleShowPassword(e) {

  }

  onClick(e) {
    this.setState({
      signedUp: !this.state.signedUp
    });
  }

  async googleSuccess (res) {
    console.log(res);
    console.log("Success!");
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      this.props.sendAuth(result, token);
    } catch (error) {
      console.log(error);
    }

  }

  googleFailure(error) {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later.');
  }

// Note: When refactoring, consider turning the repeated form div code below
// into a function/class in an external file.
  render(){
    return(
      <div>
        <h3> {this.state.signedUp ? "Sign In" : "Sign up"} </h3>
        <form onSubmit={this.onSubmit}>
          {this.state.signedUp ?
            <div className="form-container">
              <div>
                <GoogleLogin
                  clientId="272154925137-pkh6c6dhhm79hj8enundingvnsl8vbnl.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</button>
                  )}
                  onSuccess={this.googleSuccess}
                  onFailure={this.googleFailure}
                  buttonText="Login"
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className="form-field">
                <label>Username/E-mail: </label>
                <input type="text"
                  required
                />
              </div>
              <div className="form-field">
                <label>Password: </label>
                <input type="text"
                  required
                />
              </div>
              <div className="form-button-container">
                <button type="button" onClick={this.onSubmit}> Submit </button>
              </div>
              <div>
                <button type="button" onClick={this.onClick}> Create New Account </button>
              </div>
            </div>
            :
            <div className="form-container">
              <div className="form-field">
                <label>Username (optional): </label>
                <input type="text"
                />
              </div>
              <div className="form-field">
                <label>Email: </label>
                <input type="text"
                  required
                />
              </div>
              <div className="form-field">
                <label>Password: </label>
                <input type="text"
                  required
                />
              </div>
              <div className="form-field">
                <label>Repeat Password: </label>
                <input type="text"
                  required
                />
              </div>
              <div className="form-button-container">
                <button type="button" onClick={this.onSubmit}> Submit </button>
              </div>
              <div>
                <label>Already have an account?  </label>
                <button type="button" onClick={this.onClick}> Sign in </button>
              </div>
            </div>
          }
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendAuth: (result, token) => { dispatch({type: 'AUTH', data: {result, token} }) }
  }
};

export default connect(null, mapDispatchToProps)(Auth)
