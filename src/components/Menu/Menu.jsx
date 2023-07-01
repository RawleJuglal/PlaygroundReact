import React, {useState} from 'react'
import Toggler from '../Toggler/index'

const Menu = ({children, onOpen})=>{
    const sports = ['Tennis', 'Racquetball', 'Pickleball', 'Squash']
    
    return(
        <Toggler onToggle={onOpen}>
            <div className='menu'>
            <Toggler.Button>
                    Sports
                </Toggler.Button>
                <Toggler.On>
                    <Menu.Dropdown>
                    {sports.map(sport => (
                        <Menu.Item key={sport}>{sport}</Menu.Item>
                    ))}     
                    </Menu.Dropdown>
                </Toggler.On>
            </div>
        </Toggler>
    )
}

export { Menu }