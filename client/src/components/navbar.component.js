import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(){
    return(
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/list'>Word List</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
