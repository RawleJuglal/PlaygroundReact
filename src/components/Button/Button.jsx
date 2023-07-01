import React from 'react'
import classnames from 'classnames'
import './Button.css'
import { TogglerContext } from '../Toggler/Toggler'

const Button = ({children, className, size, ...rest})=>{
    const { toggle } = React.useContext(TogglerContext)
    let sizeClass = size ? `button-${size}` : ''
    const AllClasses = classnames(sizeClass, className)
    
    return(
        <>
            <button className={AllClasses} onClick={toggle} {...rest}>
                {children}
            </button>
        </>
    )
}

export { Button }