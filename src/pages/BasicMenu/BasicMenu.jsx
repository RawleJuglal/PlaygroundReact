import React from 'react'
import Menu from '../../components/Menu/index'
import './BasicMenu.css'
import { Star } from '../../components/Liked/Star'


const BasicMenu = ()=>{
    
    return(
        <>
            {/* We dont have to pass a function for the Toggler inside because 
            we've stated in the toggler if nothing provided here then onToggle
            function will be an empty function NOOPs */}
            <Star /> 
            <Menu onOpen={()=>console.log('Menu was clicked')}/>    
        </>
    )
}

export { BasicMenu }