import React from 'react'
import { getAuth, signOut } from '@firebase/auth'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './TopLevelNavbar.css'

const TopLevelNavbar = (props)=> {
    const currentUser = props.currentUser
    const auth = getAuth()
    const navigate = useNavigate()
    console.log(currentUser)

    const handleLogout = ()=>{
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('currentUser')
            props.handleUpdateCurrentUser({})
            navigate('..')
        })
    }

    return(
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="..">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav>
                            <Nav.Link href='about'>About</Nav.Link>
                            <Nav.Link href='todo'>Todo</Nav.Link>
                            {currentUser ? 
                                (<NavDropdown title='Profile' id='basic-nav-dropdown'>
                                    <NavDropdown.Item href='editProfile'>Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item></NavDropdown>) : 
                                (<Nav.Link href='signIn'>Sign In</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default TopLevelNavbar