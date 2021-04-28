import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import '../../styles/styleUniversal.css'


const BtnNav = ({title, link,}) => {
    return (
        <BoxLink>
            <NavLink activeStyle={{ background: "#222", color: "#FFF", padding: "0 10px", borderRadius: 5, transition: 0 }} className={`btnLink`} to={`/${link}`}>{title}</NavLink>
        </BoxLink>
    )
}


const BoxLink = styled.div`
    width: fit-content;
    padding: 0 10px;
    a{
        font-size: 1.1rem;
        position: relative;
        padding: 0 10px;
        z-index: 5;
        ::before{
            content: "";
            position: absolute;
            width: 0%;
            height: 25px;
            border-radius: 5px;
            background: #222;
            z-index: -1;
            transition: 0.3s;
        }
        :hover::before{
            width: 100%;
        }
        :hover{
            color: #FFF;
        }
        .active{
            ::before{
            content: "";
            position: absolute;
            width: 0%;
            height: 25px;
            border-radius: 5px;
            background: #222;
            z-index: -1;
            transition: 0.32s;
        }
            :before{
                width: 95%;
            }
        }
    }
    @media (max-width: 960px) {
        display: none;
    }
`



export default BtnNav