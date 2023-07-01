import React from 'react'
import { TogglerContext } from './Toggler'

const TogglerOff = ({children})=>{
    const { on } = React.useContext(TogglerContext)

    return on ? null : children
}

export { TogglerOff }