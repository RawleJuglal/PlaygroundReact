import React from 'react'

const TogglerContext = React.createContext()

const Toggler = ({children, onToggle})=>{
    const [on , setOn] = React.useState(false)

    React.useEffect(()=>{
        onToggle()
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