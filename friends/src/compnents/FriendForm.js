import React from 'react'

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
            this.props.updateFriend(e, this.state.friend)
        } else {
            this.props.addFriend(e, this.state.friend)
        }
        this.setState({
            name: '',
            age: '',
            email: ''
        })
    }

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