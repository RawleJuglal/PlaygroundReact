import React from 'react'

const TogglerContext = React.createContext()

// This onToggle prop is saying it equals a NOOPs function if nothing
// is passed to the onToggle prop
const Toggler = ({children, onToggle = ()=>{}})=>{
    const [on , setOn] = React.useState(false)
    const firstRender = React.useRef(true)

    React.useEffect(()=>{
        if(firstRender.current){
            firstRender.current = false
        } else {
            onToggle()
        }
        
    }, [on])

    const toggle = ()=>{
        setOn(prevOn => !prevOn)
    }

    return (
        <>
            <TogglerContext.Provider value={{on, toggle}}>
                {children}
            </TogglerContext.Provider>
            
        </>
    )
}

export { Toggler, TogglerContext }