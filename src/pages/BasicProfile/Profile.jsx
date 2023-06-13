import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut} from '@firebase/auth'
import { resetPassword, removeUser, updateUserDetails, uploadProfilePhoto } from '../../hooks/firebaseConfig'
import './Profile.css'
import { useOutletContext } from 'react-router-dom'

const Profile = ()=>{
    const {currentUser, handleUpdateCurrentUser} = useOutletContext()
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState(currentUser.user)
    const [photo, setPhoto] = useState({})

    function handleSubmit(event){
        event.preventDefault()  
        updateLocalStorageUserInfo()
        updateUserDetails(profileData)
        uploadProfilePhoto(photo.name, photo, (myData)=>{
            localStorage.setItem('currentUser', JSON.stringify(myData))
            handleUpdateCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
            setProfileData(myData.user)
        })
        
    }  

    function updateLocalStorageUserInfo(){
        let myData = JSON.parse(localStorage.getItem('currentUser'))
        let myUser = myData.user;
        const newUserObj = {...myUser, ...profileData}
        myData.user = newUserObj
        localStorage.setItem('currentUser', JSON.stringify(myData))
    }

    function handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setProfileData(prevState => {
            return {...prevState, [name]: value}
        })
    }

    function handleDeleteUser(){
        let answer = window.confirm('Delete User, this cannot be undone!')
        if(answer){
            removeUser()
            handleUpdateCurrentUser(null)
            navigate('..')
        } else {
            return;
        }
    }

    function handleResetPassword(){
        const auth = getAuth()
        resetPassword(currentUser.user.email)
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('currentUser')
            handleUpdateCurrentUser(null)
            navigate('..')
        })
        
    }

    return(
        <>
            <h1>Profile page</h1>
            {profileData.displayName ? 
                (<h1>Welcome, {profileData.displayName}</h1>) : 
                (<h1>Welcome, User</h1>)}
            {profileData.photoURL ? 
                (<img src={profileData.photoURL}/>) : 
                (<h1>No image provided</h1>)}
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="profile_photo">Select a profile photo to upload</label>
                    <input 
                        name='profile_photo' 
                        type='file' 
                        onChange={(event)=> setPhoto(event.target.files[0])}
                    />
                    <input 
                        placeholder='Display Name'
                        name="displayName"
                        value={profileData.displayName ? profileData.displayName : ''}
                        type="text" 
                        onChange={handleChange} 
                    />
                    <input 
                        placeholder='email'
                        name="email"
                        value={profileData.email ? profileData.email : ''}
                        type="email" 
                        onChange={handleChange} 
                    />
                    <input 
                        placeholder='phone number'
                        name="phoneNumber"
                        value={profileData.phoneNumber ? profileData.phoneNumber : ''}
                        type="text" 
                        onChange={handleChange} 
                    />
                    <input type="submit" value='Save'/>
                </form>
            </section>
            <section>
                <label htmlFor='password-reset'>To be sent an email to reset your password</label>
                <button id='password-reset'  onClick={handleResetPassword}>Reset Password</button>
                <br />
                <br />
                <button onClick={handleDeleteUser}>Delete User</button>
            </section>
        </>
    )
}

export default Profile;