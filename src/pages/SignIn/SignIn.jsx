import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, signOut} from '@firebase/auth'
import ListGroup from 'react-bootstrap/ListGroup';
import { Google, Facebook, Apple, Twitter, Microsoft, Github, Envelope } from 'react-bootstrap-icons';

const SignIn = ()=> {
    const auth = getAuth()
    const [currentUser, setCurrentUser] = useState()
    const googleProvider = new GoogleAuthProvider()
    const microsoftProvider = new OAuthProvider('microsoft.com')
    const facebookProvider = new FacebookAuthProvider()
    const githubProvider = new GithubAuthProvider()
    
    const handleGoogle = ()=> {
        signInWithPopup(auth, googleProvider)
        .then((results)=>{
            const credential = GoogleAuthProvider.credentialFromResult(results)
            const token = credential.accessToken;
            const authenticated = {credToken: token, user: results.user}
            localStorage.setItem('currentUser', JSON.stringify(authenticated))
            setCurrentUser(authenticated)
        })
        .catch(error => {
            throw new Error(error)
        })

    }

    const handleMicrosoft = ()=>{
        return null;
    }

    const handleFacebook = ()=>{
        return null;
    }

    const handleTwitter = ()=>{
        return null;
    }

    const handleGithub = ()=>{
        signInWithPopup(auth, githubProvider )
            .then((result)=>{
                const credential = GithubAuthProvider.credentialFromResult(result)
                const token = credential.accessToken;
                const authenticated = {credToken: token, user: result.user}
                localStorage.setItem('currentUser', JSON.stringify(authenticated))
                setCurrentUser(authenticated)
            })
            .catch(error =>{
                throw new Error(error)
            })
    }

    const handleLogout = ()=>{
        signOut(auth)
        .then(()=>{
            localStorage.removeItem('currentUser')
            setCurrentUser(null)
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
                        <ListGroup.Item action onClick={handleMicrosoft}>
                            <Microsoft /> Microsoft
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleFacebook}>
                            <Facebook /> Facebook
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleTwitter}>
                            <Twitter /> Twitter
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleGithub}>
                            <Github /> Github
                        </ListGroup.Item>
                    </ListGroup>
                    </div>
                </section>
                <section>
                    <h2>Current User: {currentUser ? currentUser.user.displayName : 'No One'}</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </section>
            </main>
        </>
    )
}

export default SignIn;