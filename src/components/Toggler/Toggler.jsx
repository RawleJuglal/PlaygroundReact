import React from 'react'

const TogglerContext = React.createContext()

const Toggler = ({children, onToggle})=>{
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