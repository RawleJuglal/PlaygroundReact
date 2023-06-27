import React from 'react'
import { Menu } from '../../components/Menu/Menu'
import { Button } from '../../components/Button/Button'
import { MenuDropDown } from '../../components/Menu/MenuDropdown'
import { MenuItem } from '../../components/Menu/MenuItem'
import './BasicMenu.css'

const BasicMenu = ()=>{
    const sports = ['Tennis', 'Racquetball', 'Pickleball', 'Squash']
    return(
        <>
            <Menu>
                <Button>Sports</Button>
                <MenuDropDown>
                    {sports.map(sport => (
                        <MenuItem key={sport}>{sport}</MenuItem>
                    ))}
                    
                </MenuDropDown>
            </Menu>
        </>
    )
}

export { BasicMenu }