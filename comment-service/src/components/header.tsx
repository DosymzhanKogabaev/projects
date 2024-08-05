import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <div className="flex items-center justify-between">
            <img src={logo} className='w-24 block' alt='logo'></img>
            <div className="flex gap-4">
                <button className='border-2 px-4 py-2 rounded bg-violet-300'>Sign In</button>
                <button className='border-2 px-4 py-2 rounded bg-purple-500'>Sign Up</button>
            </div>
        </div>
    )
}
export default Header