import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import '../styles/styleUniversal.css'


const BtnNav = ({title, link, main, }) => {
    return (
        <BoxLink>
            <Link className={`btnLink ${main}`} to={`/${link}`}>{title}</Link>
        </BoxLink>
    )
}


const BoxLink = styled.div`
    width: fit-content;
    padding: 0 10px;
    a{
        padding: 0 10px;
        position: relative;
        z-index: 5;
        ::before{
            content: "";
            position: absolute;
            width: 95%;
            height: 25px;
            transform: scale(0) rotate(60deg);
            border-radius: 5px;
            background: #222;
            z-index: -1;
            left: 3px;
            bottom: 0;
            transition: 0.32s;
        }
        :hover::before{
            transform: scale(1) rotate(0deg);
            
        }
        :hover{
            color: #FFF;
        }
    }
    @media (max-width: 960px) {
        display: none;
    }
`



export default BtnNav