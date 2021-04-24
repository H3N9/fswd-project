import React,{useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ModalResult = ({title, icon, color, setIsCreate}) => {
    const [transX, setTransX] = useState("");
    useEffect(()=>{
        setTimeout(() => setTransX("translateY(-120px)"), 2000);
        setTimeout(() => setIsCreate(undefined), 2500);  
    },[])
    return (
        <Container>
            <Banner bgColor={color} translateX={transX}>
                <FontAwesomeIcon icon={['fas', icon]} size="3x" /> 
                <p>{title}</p>
            </Banner>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    justify-content:center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
`


const transform = keyframes`
  from {
    transform: translateY(-100px);
  }

  to {
    transform: translateY(0px);
  }
`;


const Banner = styled.div`
    margin-top: 20px;
    padding: 10px 70px;
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
    transform: ${(props) => props.translateX};
    animation: ${transform} 1s;
    
`

export default ModalResult;