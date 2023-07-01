import React from 'react'
import { TogglerContext } from './Toggler'

const TogglerOn = ({children})=>{
    const { on } = React.useContext(TogglerContext)

    return on ? children : null
}

export { TogglerOn }