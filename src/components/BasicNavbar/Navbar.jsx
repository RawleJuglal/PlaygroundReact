import React from 'react'
import { NavLink, Link, } from 'react-router-dom'
import './Navbar.css'

const Navbar = ()=> {
    return(
        <>
            <nav className='--navbar flex'>
                <NavLink to='about'>About</NavLink>
                <NavLink to='signIn'>Sign In</NavLink>
            </nav>
        </>
    )
}

export default Navbar