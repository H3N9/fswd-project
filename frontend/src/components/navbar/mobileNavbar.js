import React, {useEffect} from 'react'
import styled from 'styled-components'
import BoxLink from './btnNav'
import { Link } from 'react-router-dom'
const MobileNavbar = ({isShowMenu, setIsShowMenu}) =>{
    
    useEffect(() => {
        document.body.style.overflow = isShowMenu ? "hidden" : "initial";
    }, [isShowMenu])
    return(
        <Mainmenu right={isShowMenu ? "0" : "100%"} opacity={isShowMenu ? "1" : "0"} duration={isShowMenu ? "0s" : "0.95s"}>
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
    padding-left :20px;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(10px);
    position: fixed;
    padding-top: 100px;
    z-index: 8;
    right: ${(props) => props.right};
    opacity: ${(props) => props.opacity};
    transition: opacity 0.25s, right ${(props) => props.duration};

    @media (min-width: 960px) {
       display: none;
    }
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