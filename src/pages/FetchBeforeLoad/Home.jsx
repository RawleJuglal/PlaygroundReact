import React from 'react'
import { useOutletContext, Link } from 'react-router-dom';

import './Home.css'

const loader = ()=>{
  return null;
}

const Home = ()=>{
  const photos = useOutletContext()

  const myElements = photos.map(item => {
    return (
      <>
      <div key={item.id}>
        <img src={item.url} alt="" />
      </div>
      </>
    )
  })
  return(
    <main>
      {myElements}
    </main>
  )
}

export {Home, loader}
