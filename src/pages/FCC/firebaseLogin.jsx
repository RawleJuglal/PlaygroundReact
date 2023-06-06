import React, {useState} from 'react';
import  { app } from '../../hooks/firebaseConfig'
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    GithubAuthProvider
} from '@firebase/auth';

export default function FirebaseLogin(){
    let auth = getAuth();
    let googleProvider = new GoogleAuthProvider()
    let githubProvider = new GithubAuthProvider()
    const [ data, setData ] = useState({});

    const handleInput = (event)=> {
        let newInput = {[event.target.name] : event.target.value };

        setData({...data, ...newInput})
    };

    const handleSubmit = ()=> {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=> {
            console.log(response.user)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const handleGoogle = ()=> {
        signInWithPopup(auth, googleProvider)
        .then(response => console.log(response))
        .catch(error => {
            alert(error.message)
        })
    }

    const handleGithub = ()=> {
        signInWithPopup(auth, githubProvider )
            .then(response => console.log(response))
            .catch(error =>{
                alert(error.message)
            })
    }
    const addData = ()=>{
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response)=> {
            console.log(response.user)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    const handlelogout = (auth)=> {
        signOut(auth).then(() => {
            console.log(auth)
          }).catch((error) => {
            console.log(error.message)
          });
    }

    return(
        <div className='--firebaseLogin-app'>
            <input
                name="email"
                type='email'
                placeholder='email'
                onChange={(event)=> handleInput(event)}
            />
            <input 
                name="password"
                type='password'
                placeholder='password'
                onChange={(event)=> handleInput(event)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleGoogle}>Google Auth</button>
            <button onClick={handleGithub}>Github Auth</button>
            <button onClick={addData}>Log In</button>
            <button onClick={handlelogout}>Log out</button>
        </div>
    )
}