import React from 'react'
import './MenuDropdown.css'

const MenuDropDown = ({children, open})=>{
    return(
        <>
            {open && (<div className='menu-dropdown'>
                {children}
            </div>)}
        </>
        

    )
}

export { MenuDropDown }