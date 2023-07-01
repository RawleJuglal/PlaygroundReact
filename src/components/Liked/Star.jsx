import React from 'react'
import Toggler from '../Toggler/index'
import { BsStar, BsStarFill } from 'react-icons/bs'

const Star = ({onChange})=>{
    return(
        <Toggler onToggle={onChange}> 
            <Toggler.Button>
                <Toggler.On>
                    <BsStarFill />
                </Toggler.On>
                <Toggler.Off>
                    <BsStar />
                </Toggler.Off>
            </Toggler.Button>.
        </Toggler>
    )
}


export { Star }