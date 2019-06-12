import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import FriendsList from './compnents/FriendsList';

import logo from './logo.svg';
import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Route path='/' component={FriendsList} exact />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Save Friends List
          </a>
        </header>
      </div>
    );
  }

}
