import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form">
            <label>Username: </label>
            <input type="text"
              required
              className="form-field"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div>
            <input type="submit" value="Sign Up" className="sign-up-btn" />
          </div>
        </form>
      </div>
    );
  }
}
