import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function MainLayout() {
    return (
        <div className='space-y-48 mt-12'>
            <div className='container mx-auto font-inter p-4 md:p-0'>
                <Navbar />
                <div className='min-h-screen w-full'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
