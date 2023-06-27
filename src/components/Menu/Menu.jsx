import React, {useState} from 'react'
import { Button } from '../../components/Button/Button'
import { MenuDropDown } from './MenuDropdown'


const Menu = ({children})=>{
    const [open, setOpen] = React.useState(true)

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }
    
    return(
        <>
           <div className='menu'>
                {React.Children.map(children, (child)=>{
                    return React.cloneElement(child, {
                        open,
                        toggle
                    })
                })}
           </div>
        </>
    )
}

export { Menu }