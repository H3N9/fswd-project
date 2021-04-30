import React, {useEffect} from 'react'
import styled from 'styled-components'
import BoxLink from './btnNav'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ME_QUERY } from '../../graphql/meQuery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Border } from '../../styles/styleComponents'

const MobileNavbar = ({isShowMenu, setIsShowMenu}) =>{
    const { data, loading, error } = useQuery(ME_QUERY)
    const user = data === undefined ? {me:{name: "u"}} : data
    const isAdmin =  loading ? false : data.me === null ? false : data.me.isAdmin
    console.log(user)
    useEffect(() => {
        document.body.style.overflow = isShowMenu ? "hidden" : "overlay";
    }, [isShowMenu])
    return(
        <Mainmenu right={isShowMenu ? "0" : "100%"} opacity={isShowMenu ? "1" : "0"} duration={isShowMenu ? "0s" : "0.95s"}>
            <MenuContainer>
                {user.me === null ?
                    <>
                    </>
                :
                    <UserDetail>
                        <div className="user-image">
                            <FontAwesomeIcon icon={['fas', 'user']} />
                        </div>
                        <div className="user-text">
                            <h1>{user.me.name}</h1>
                            <h3>{isAdmin ? "ผู้ดูแลระบบ" : "ผูใช้งานทั่วไป"}</h3>
                        </div>
                    </UserDetail>
                }
                <MenuRole>
                    { isAdmin ? 
                        <>
                            <NavLink to={`/products`} onClick={() => setIsShowMenu(false)}>สินค้าทั้งหมด</NavLink>
                            <Border />
                            <NavLink to={`/promotions`} onClick={() => setIsShowMenu(false)}>โปรโมชั่น</NavLink> 
                            <Border />
                            <NavLink to={`admin/orders`} onClick={() => setIsShowMenu(false)}>จัดการออเดอร์</NavLink>
                            <Border />
                            <NavLink to={`/best`} onClick={() => setIsShowMenu(false)}>จัดการสินค้า</NavLink>
                            <Border />
                            <NavLink to={`admin/products`} onClick={() => setIsShowMenu(false)}>จัดการโปรโมชั่น</NavLink>
                            <Border />
                            <NavLink to={`admin`} onClick={() => setIsShowMenu(false)}>Dashboard</NavLink> 
                            <Border />
                        </>
                    :
                        <>
                            <NavLink to={`/products`} onClick={() => setIsShowMenu(false)}>สินค้าทั้งหมด</NavLink>
                            <Border />
                            <NavLink to={`/promotions`} onClick={() => setIsShowMenu(false)}>โปรโมชั่น</NavLink> 
                            <Border />
                        </>
                    }                    
                </MenuRole>
                  {user.me === null ?
                        <AuthContainer>
                            <NavLink className="login-button" to={`/login`} onClick={() => setIsShowMenu(false)}>
                                <FontAwesomeIcon icon={['fas', 'sign-in-alt']} size="small" />
                                {" เข้าสู่ระบบ"}
                            </NavLink>
                            <NavLink className="register-button" to={`/register`} onClick={() => setIsShowMenu(false)}>
                                <FontAwesomeIcon icon={['fas', 'user-plus']} size="small" />
                                {" ลงทะเบียน"}
                            </NavLink>
                        </AuthContainer>
                    :
                        <AuthContainer>
                            <NavLink className="logout-button" to={``} onClick={() => setIsShowMenu(false)}>
                                <FontAwesomeIcon icon={['fas', 'sign-out-alt']} size="small" />
                                {" ออกจากระบบ"}
                            </NavLink>
                        </AuthContainer>
                    }
            </MenuContainer>
        </Mainmenu>
    );
}

const Mainmenu = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
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
    padding: 10px 30px;
    
    a{
        text-decoration: none;
        font-size: clamp( 1.1rem, 4.5vw,1.6rem);
        color: #FFF;
        margin: 10px 0;
        width: fit-content;
    }
`
const UserDetail = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    .user-image{
        width: clamp(75px,7.5vw,95px);
        height:  clamp(75px,7.5vw,95px);
        background-image: linear-gradient(120deg, #5128e6 , #2891e6);
        border-radius: 50%;
        display: flex;
        color: rgba(255,255,255, 0.9);
        font-weight: bold;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        margin-right: 10px;
    }
    .user-text{
        color: #FFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1{
            margin: 0;
            font-weight: 500;
            line-height: 1;
        }
        h3{
            margin: 0;
            color: #BBB;
        }
    }

`
const MenuRole = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    a{
        width: fit-content;
        margin: 20px 0;
        position: relative;
        padding: 0 5px; 
        transition: 0.2s;
        ::before{
            content: "";
            position: absolute;
            width: 0;
            left: 0;
            background: #FFF;
            border-radius: 3px;
            height: 100%;
            transition: 0.35s;
            z-index: -1;
        }
        :hover::before{
            transition: 0.35s;
            width: 100%;
        }
        :hover{
            color: #111;
        }
    }
`

const AuthContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    a{
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 20px;
        svg{
            font-size: 20px;
        }
        &.register-button{
            background: #2891e6;
        }
        &.login-button{
            background: #FFF;
            color: #2891e6;
        }
        &.register-button{
            background: #2891e6;
        }
        &.logout-button{
            background: #e62828;
            color: #FFF;
        }
    }    
`

export default MobileNavbar;