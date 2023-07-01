import React from 'react'
import Menu from '../../components/Menu/index'
import './BasicMenu.css'
import { Star } from '../../components/Liked/Star'


const BasicMenu = ()=>{
    
    return(
        <>
            <Star onChange={()=>console.log('Star was clicked')} /> 
            <Menu onOpen={()=>console.log('Menu was clicked')}/>    
        </>
    )
}

export { BasicMenu }