import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import '../../styles/styleUniversal.css'


const BtnNav = ({title, link,}) => {
    return (
        <BoxLink>
            <Link className={`btnLink`} to={`/${link}`}>{title}</Link>
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
            width: 0%;
            height: 25px;
            border-radius: 5px;
            background: #222;
            z-index: -1;
            transition: 0.32s;
        }
        :hover::before{
            width: 95%;
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