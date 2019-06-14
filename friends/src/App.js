import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import Home from './compnents/Home'
import FriendsList from './compnents/FriendsList'
import Friend from './compnents/Friend'
import FriendForm from './compnents/FriendForm'

import logo from './logo.svg'
import './App.css'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
        friends: [],
        newFriend: null
    }
  }

componentDidMount() {
    axios
        .get('http://localhost:5000/friends')
        .then(res => {
            this.setState(() => ({friends: res.data}))
        })
        .catch(error => {
            console.error('Server Error', error)
        })
  }

  addFriend = (e, friend) => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/friends', friend)
      .then(res => {
        this.setState({
          friends: res.data
        })
        this.props.history.push('/friends')
      })
      .catch(err => console.error(err))
  }

  updateFriend = (e, friend) => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/friends/${friend.id}`, friend)
      .then(res => {
        this.setState({
          newFriend: null,
          friends: res.data
        })
        this.props.history.push('/friends')
      })
      .catch(err => console.error(err))
  }

  setUpdateForm =(e, friend) => {
    e.preventDefault()
    this.setState({
      newFriend: friend
    })
    this.props.history.push('/new-friend')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to ='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>

          <Route
            path='/'
            exact
            render={() => (
              <Home />
            )}
          />
          <Route
            path='/friends'
            exact
            render={props => (
              <FriendsList {...props} friendList={this.state.friends} />
            )}
          />
          <Route
            path='/friends/:id'
            render={props => (
              <Friend
                {...props}
                setUpdateForm={this.setUpdateForm}
                friendList={this.state.friends}
              />
            )}
          />
          <Route
            path={'/new-friend'}
            render={props => (
              <FriendForm
                {...props}
                addFriend={this.addFriend}
                updateFriend={this.updateFriend}
                newFriend={this.state.newFriend}
              />
            )}
          />
        </header>
      </div>
    );
  }

}
