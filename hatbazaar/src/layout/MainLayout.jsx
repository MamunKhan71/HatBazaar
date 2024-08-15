import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div className='container mx-auto font-inter'>
            <Navbar />
            <Outlet />
        </div>
    )
}
