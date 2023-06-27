import React, {useState} from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from '@firebase/auth'
import ListGroup from 'react-bootstrap/ListGroup';
import { Google, Twitter, Github, Facebook } from 'react-bootstrap-icons';
import { Button } from '../../components/Button/Button';

const SignIn = ()=> {
    const auth = getAuth()
    const navigate = useNavigate()
    const {currentUser, handleUpdateCurrentUser} = useOutletContext()

    // const [currentUser, setCurrentUser] = useState()
    const [manualSignIn, setManualSignIn] = useState({email:'', password:''})
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const twitterProvider = new TwitterAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    
    const handleGoogle = ()=> {
        signInWithPopup(auth, googleProvider)
        .then((results)=>{
            const credential = GoogleAuthProvider.credentialFromResult(results)
            const token = credential.accessToken;
            const authenticated = {credToken: token, user: results.user}
            localStorage.setItem('currentUser', JSON.stringify(authenticated))
            console.log(authenticated)
            handleUpdateCurrentUser(authenticated)
            navigate('..')
        })
        .catch(error => {
            throw new Error(error)
        })

    }

    const handleTwitter = ()=>{
        signInWithPopup(auth, twitterProvider)
        .then((result)=>{
            const credential = TwitterAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const secret = credential.secret;
            const authenticated = {credToken: token, user: result.user}
            localStorage.setItem('currentUser', JSON.stringify(authenticated))
            handleUpdateCurrentUser(authenticated)
            navigate('..')
        })
        .catch((error)=>{
            throw new Error(error)
        })
    }

    const handleGithub = ()=>{
        signInWithPopup(auth, githubProvider )
            .then((result)=>{
                const credential = GithubAuthProvider.credentialFromResult(result)
                const token = credential.accessToken;
                const authenticated = {credToken: token, user: result.user}
                localStorage.setItem('currentUser', JSON.stringify(authenticated))
                handleUpdateCurrentUser(authenticated)
                navigate('..')
            })
            .catch(error =>{
                throw new Error(error)
            })
    }

    const handleFacebook = ()=>{
        console.log('in handlefacebook')
        signInWithPopup(auth, facebookProvider)
        .then((result)=> {
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const authenticated = {credToken: token, user: result.user}
            localStorage.setItem('currentUser', JSON.stringify(authenticated))
            handleUpdateCurrentUser(authenticated)
            navigate('..')
        })
        .catch((error)=> {
            console.log(`${error.code} - ${error.message}`)
        })
    }

    const handleLogout = ()=>{
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('currentUser')
            handleUpdateCurrentUser(null)
            navigate('..')
        })
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        signInWithEmailAndPassword(auth, manualSignIn.email, manualSignIn.password)
        .then((userCredentials)=>{
            localStorage.setItem('currentUser', JSON.stringify(userCredentials))
            handleUpdateCurrentUser(userCredentials)
            navigate('..')
        })
        .catch(error=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} - ${errorMessage}`)
        })
    }

    const handleManualInputChange = (event)=> {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        setManualSignIn(prevState => {
            return { ...prevState, [name]: value}
        })
    }

    return(
        <>
            <main>
                <section>
                    <h1>Please use an authentication or log in with email/password</h1>
                    <p>If you do not have an account <Link to='sign_up'>Sign Up Here</Link></p>
                    <div>
                    <ListGroup variant='flush'>
                        <ListGroup.Item action onClick={handleGoogle}>
                            <Google /> Google
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleTwitter}>
                            <Twitter /> Twitter
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleGithub}>
                            <Github /> Github
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleFacebook}>
                            <Facebook /> Facebook
                        </ListGroup.Item>
                    </ListGroup>
                    </div>
                </section>
                <section>
                    <h2>Or use the form below to sign in with email/password</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder='email'  
                            required
                            value={manualSignIn.email}
                            onChange={(event)=>handleManualInputChange(event)}
                            />
                        <input 
                            type="password" 
                            name="password" 
                            placholder="password" 
                            required 
                            value={manualSignIn.password}
                            onChange={(event)=> handleManualInputChange(event)}
                            />
                        <input type="submit" value="Submit" />
                    </form>
                </section>
                <section>
                    <h2>Current User: {currentUser ? currentUser.displayName : 'No One'}</h2>
                    <Button size='sm' onClick={handleLogout}>
                        Sign Out
                    </Button>
                    <button onClick={handleLogout}>Log Out</button>
                </section>
            </main>
        </>
    )
}

export default SignIn;