import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <Link to={'/'} className="btn btn-ghost text-xl">HatBazaar</Link>
            </div>
            <div className="navbar-end">
                <Link to={'/login'} className="btn rounded-none">Login / Signup</Link>
            </div>
        </div>
    )
}
