import React from 'react'
import axios from 'axios'

export default class FriendForm extends React.Component {
    state = {
        friend: this.props.newFriend || {
            name: '',
            age: '',
            email: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.newFriend &&
            prevProps.newFriend !== this.props.newFriend
        ) {
            this.setState({
                friend: this.props.newFriend
            })
        }
    }

    changeHandler = e => {
        e.persist()
        let value = e.target.value
        this.setState(prevState => ({
            friend: {
                ...prevState.friend,
                [e.target.name]: value
            }
        }))
    }

    handleSubmit = e => {
        if (this.props.newFriend) {
            this.updateFriend(e, this.state.friend)
        } else {
            this.addFriend(e, this.state.friend)
        }
        this.setState({
            name: '',
            age: '',
            email: ''
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
            console.log('history', this.props.history)
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

    //   setUpdateForm =(e, friend) => {
    //     e.preventDefault()
    //     this.setState({
    //       newFriend: friend
    //     })
    //     this.props.history.push('/new-friend')
    //   }

    render() {
        return (
            <div className='friend-form'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        onChange={this.changeHandler}
                        placeholder='name'
                        value={this.state.friend.name}
                    />
                    <input
                        type='text'
                        name='age'
                        onChange={this.changeHandler}
                        placeholder='age'
                        value={this.state.friend.age}
                    />
                    <input
                        type='text'
                        name='email'
                        onChange={this.changeHandler}
                        placeholder='email'
                        value={this.state.friend.email}
                    />
                    <button>
                    {`${this.props.newFriend ? "Update" : "Add New"} Friend`}
                    </button>
                </form>
            </div>
        )
    }
}