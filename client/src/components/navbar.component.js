import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state= {
      userState: JSON.parse(localStorage.getItem('profile'))
    };

    this.getUser = this.getUser.bind(this);
    // this.setUser = this.setUser.bind(this);
  }

  getUser() {
    console.log("Here is our userState: ");
    console.log(this.state.userState);
    console.log("Here is google's state: ");
    console.log(JSON.parse(localStorage.getItem('profile')));
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const token = this.state.userState?.token;
    this.setState({
      userState: JSON.parse(localStorage.getItem('profile'))
    });
  }

  render(){
    return(
      <nav>
        <div>
          <ul>
            <li>
              <Link to='/' onClick={this.getUser}>Home</Link>
            </li>
            <li>
              <Link to='/list'>Word List</Link>
            </li>
          </ul>
          <button onClick={this.getUser}> Get Me </button>
        </div>
      </nav>
    );
  }
}
