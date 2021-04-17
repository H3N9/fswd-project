import React, {useEffect} from 'react'
import styled from 'styled-components'
import BoxLink from '../components/btnNav'
import { Link } from 'react-router-dom'
const MobileNavbar = ({isShowMenu, setIsShowMenu}) =>{
    
    useEffect(() => {
        document.body.style.overflow = isShowMenu ? "hidden" : "initial";
    }, [isShowMenu])
    return(
        <Mainmenu style={{right: isShowMenu ? "0%" : "100%"}}>
            <MenuContainer>
                <Link to={`/new`} onClick={() => setIsShowMenu(false)}>สินค้าใหม่</Link>
                <Link to={`/best`} onClick={() => setIsShowMenu(false)}>สินค้าขายดี</Link>
                <Link to={`/discount`} onClick={() => setIsShowMenu(false)}>สินค้าลดราคา</Link>
                <Link to={`/recommend`} onClick={() => setIsShowMenu(false)}>สินค้าแนะนำ</Link>  
            </MenuContainer>
        </Mainmenu>
    );
}

const Mainmenu = styled.div`
    width: 100%;
    height: 100vh;
    padding-left :50px;
    background: rgba(0,0,0,0.8);
    position: fixed;
    overflow: scroll;
    padding-top: 100px;
    right: 100%;
    transition: 0.65s;
`
const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    a{
        text-decoration: none;
        font-size: 1.6rem;
        color: #FFF;
        margin: 20px 0;
        width: fit-content;
    }
`

export default MobileNavbar;