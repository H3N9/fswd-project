import React from 'react'
import NavBar from './navbar/navbar'
import MobileNavbar from './navbar/mobileNavbar'
import {useLocation} from 'react-router-dom'

const NavbarPack = ({setIsShowMenu, isShowMenu, ignorePath, isAdmin, user}) => {
    const location = useLocation()
    const path = location.pathname
    const hidden = ignorePath.find((ignore) => ignore === path)
    const style = hidden? "none":"block"
    return (
        <div style={{display:style}}>
            <NavBar setIsShowMenu={setIsShowMenu} isShowMenu={isShowMenu} isAdmin={isAdmin} user={user}/>
            <MobileNavbar isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} isAdmin={isAdmin} user={user}/>
        </div>
    )
}


export default NavbarPack