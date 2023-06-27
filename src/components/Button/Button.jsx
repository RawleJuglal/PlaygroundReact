import React from 'react'
import classnames from 'classnames'
import './Button.css'

const Button = ({children, className, size, toggle, ...rest})=>{
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