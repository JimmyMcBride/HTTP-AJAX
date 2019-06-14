import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return <Link to='/friends' style={{ color: '#61dafb', textDecoration: 'none' }}><h2>Friends List</h2></Link>
}