import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function MainLayout() {
    return (
        <div className='space-y-48'>
            <div className='container mx-auto font-inter'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
