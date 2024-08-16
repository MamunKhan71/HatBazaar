import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

export default function Navbar() {
    const { user, logOut } = useContext(AuthContext)
    return (
        <div className="navbar">
            <div className="navbar-start">
                <Link to={'/'} className="font-bold text-xl">HatBazaar</Link>
            </div>
            <div className="navbar-end">
                {!user ? <Link to={'/login'} className="btn rounded-none">Login / Signup</Link> : <button onClick={() => logOut()} className="btn rounded-none">Logout</button>}

            </div>
        </div>
    )
}
