import React from 'react'
import './MenuDropdown.css'


const MenuDropDown = ({children})=>{

    return(
        <div className='menu-dropdown'>
            {children}
        </div>
    )

}

export { MenuDropDown }