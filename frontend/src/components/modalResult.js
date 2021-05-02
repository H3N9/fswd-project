import React,{useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ModalResult = ({title, icon, color, setIsCreate}) => {
    const [opacity, setOpacity] = useState();
    useEffect(()=>{
        setTimeout(() => setOpacity("0"), 1500);
        setTimeout(() => setIsCreate(undefined), 1600);  
    },[])
    return (
        <Container opacityValue={opacity}>
            <Banner bgColor={color}>
                <FontAwesomeIcon icon={['fas', icon]} size="3x" /> 
                <p>{title}</p>
            </Banner>
        </Container>
    )
}


const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0, 0.5);
    backdrop-filter: blur(7px);
    display: flex;
    justify-content:center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    opacity: ${(props) => props.opacityValue};
    transition: 0.25s;
    animation: ${fade} 0.5s;
`

const Banner = styled.div`
    margin-top: 20px;
    padding: 10px 70px;
    height: fit-content;
    background: ${(props) => props.bgColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    transition: 1s;
    color: #FFF;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    p{
        font-size: 1.3rem;
        margin-left: 10px;
    }
   
    
    
`

export default ModalResult;