import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import TopLevelNavbar from '../BasicNavbar/TopLevelNavbar'

const Layout = ()=> {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')))

    function updateCurrentUser(userObj){
        setCurrentUser(()=>({...userObj}))
    }
    return(
        <>
            <TopLevelNavbar currentUser={currentUser} handleUpdateCurrentUser={updateCurrentUser} />
            <Outlet context={{currentUser:currentUser, handleUpdateCurrentUser:updateCurrentUser}}/>
        </>
        
    )
}

export default Layout;