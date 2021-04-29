import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import Bg2 from '../../images/bg2.png'
import Bg3 from '../../images/bg3.jpg'



const SlideShow = () => {
    const [images, setImages] = useState("")
    const [number, setNumber] = useState(0)
    const imagesStore = [Bg2, Bg3]
    const mainImage = useRef()
    const widthMainImage = mainImage.current
    const [width, setWidth] = useState(document.body.clientWidth*0.9)
    console.log(width)

    const resizeHandle = () => {
        setWidth(widthMainImage?.offsetWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])

   

    return (
        <MainImage ref={mainImage}>
            <Image src={Bg2} />
            <Image src={Bg3} />
        </MainImage>
    )
}

const MainImage = styled.div`
    background-position: center center;
    width: 100%;
    height: 40vh;
    margin-bottom: 5vh;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    overflow: hidden;
`
const slide = keyframes`
    0% {transform: translateX(0)}
    25% {transform: translateX(-300px)},
    50% {transform: translateX(-700px)},
    75% {transform: translateX(-900px)},
    100% {transform: translateX(0)},

`
const Image = styled.img`
    height: 100%;
    object-fit: cover;
    animation: ${slide} 8s ease-in-out infinite;
`



export default SlideShow