import React from 'react';

export default function Friend({ friendList, match, setUpdateForm }) {
    const friend = friendList.find(
        friend => `${friend.id}` === match.params.id
    )

    if (!friendList.length || !friend) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h2>{friend.name}</h2>
            <p>{friend.age}</p>
            <p>{friend.email}</p>
            <button onClick={e => setUpdateForm(e, friend)}>
                Update Friend Info
            </button>
        </div>
    )
}
