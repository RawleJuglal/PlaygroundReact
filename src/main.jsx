import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Error from './components/Error/Error'
import Layout from './components/BasicLayout/Layout'
import Home from './pages/BasicHome/Home'
import About from './pages/BasicAbout/About'
import SignIn from './pages/SignIn/SignIn'
import FirebaseLogin from './pages/FCC/firebaseLogin'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

//Example of loading a fetch request and using outlet context to pass to application
// import {Layout, loader as layoutLoader} from './components/FetchBeforeLoad/Layout'
// import {Home, loader as homeLoader} from './pages/FetchBeforeLoad/Home'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />} errorElement={<Error/>}>
    <Route index element={<Home />}/>
    <Route path='about' element={<About />}/>
    <Route path='signIn' element={<SignIn />}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
