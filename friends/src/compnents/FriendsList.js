import React from 'react'
import { Link } from 'react-router-dom'

export default function FriendsList(props) {
    return (
        <div className='friends-list'>
            <h2>Friends List:</h2>
            {props.friendList.map(friend => (
                <Link
                    key={friend.id}
                    to={`/friends/${friend.id}`}
                    style={{ textDecoration: 'none', color: 'white' }}>
                    <FriendDetails key={friend.id} friend={friend} />
                </Link>
            ))}
            <Link
                to='/new-friend'
                style={{ color: '#61dafb', textDecoration: 'none' }}>
                Add New Friend
            </Link>
        </div>

    )
}

function FriendDetails({ friend }) {
    const { name } = friend
    return (
        <div>
            <h3>{name}</h3>
        </div>
    )
}