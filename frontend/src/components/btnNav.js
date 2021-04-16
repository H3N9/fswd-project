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
    height: 80px;
    padding: 0 10px;
    a{
        padding: 0 10px;
    }
`



export default BtnNav