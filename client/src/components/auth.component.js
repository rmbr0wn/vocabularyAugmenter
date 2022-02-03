import React, { Component } from 'react';

export default class Auth extends Component {

  constructor(props){
    super(props);
    this.state= {
      showPassword: false,
      signedUp: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
  }

  onSubmit(e) {

  }

  onChange(e) {

  }

  handleShowPassword(e) {

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
            </div>
          }
        </form>
      </div>
    )
  }
}
