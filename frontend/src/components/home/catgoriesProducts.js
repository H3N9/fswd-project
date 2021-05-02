import React, {useRef} from 'react'
import {Title, TitleText, Catgories, Button} from '../../styles/styleComponents'
import Card from './card'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CatgoriesBooks = ({products, title, setIsToCart}) => {
    const pageRef = useRef(0);

    const prevClick = () =>{
        const slide = pageRef.current    
        slide.scrollLeft -= slide.offsetWidth;
        if(slide.scrollLeft <= 0){
            slide.scrollLeft = slide.scrollWidth;
        }

    } 
    const nextClick = () =>{
        const slide = pageRef.current    
        slide.scrollLeft += slide.offsetWidth;
        if(slide.scrollLeft >= (slide.scrollWidth-slide.offsetWidth)){
            slide.scrollLeft = 0;
        }
    } 
    return (
        <Container>
            <Title>
                <TitleText>{title}</TitleText>
            </Title>
            <Wrapper >
                <ButtonWrapper>
                    <NavButton onClick={() => prevClick()}> <FontAwesomeIcon icon={['fas', 'chevron-left']} /></NavButton>
                </ButtonWrapper>
                <Catgories ref={pageRef}>
                    {products?.map((product, index) => (<Card key={index} product={product}  setIsToCart={setIsToCart} />))} 
                </Catgories>
                <ButtonWrapper>
                    <NavButton onClick={() => nextClick()}><FontAwesomeIcon icon={['fas', 'chevron-right']} /></NavButton>
                </ButtonWrapper>
            </Wrapper>
        </Container>
    )
}


const Container = styled.div`
    padding: 8vmin 0;
`

const NavButton = styled.button`
    border: none;
    background: rgba(0,0,0,0.75);
    color: #FFF;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    :active{
        transform: scale(0.5);
    }
`

const Wrapper = styled.div`
    display: flex;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 450px){
        display: none;
    }
`
export default CatgoriesBooks