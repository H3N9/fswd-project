import React from 'react'
import styled from 'styled-components'
import UpNumber from '../detail/upNumber'


const CardCart = ({product, quantity, addOrder}) => {
    const {image = "", title = "", price = 0, discount = 0} = product
    const priceWdiscount = price-discount

    const lockClikcing = (n, command) => {
        if(command === "Increase"){
            addOrder(product, n+1, "Set")
        }
        else if(command === "Decrease"){
            addOrder(product, n-1, "Set")
        }
    }

    return (
        <CardCartBox>
            <ImageTitleBox>
                <ImageBox>
                    <Image src={image} />
                </ImageBox>
                <TitleBox>
                    {title}
                </TitleBox>
            </ImageTitleBox>
            <TextBox>
                {`฿ ${priceWdiscount.toFixed(2)}`}
            </TextBox>
            <UpBox>
                <UpNumber number={quantity} handleNumber={lockClikcing} />
            </UpBox>
            <TextBox>
                {`฿ ${priceWdiscount.toFixed(2)}`}
            </TextBox>
        </CardCartBox>
    )

}

const CardCartBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px 0;

`
const ImageTitleBox = styled.div`
    width: 40%;
    display: flex;
    justify-content:center;
    align-items: center;
    @media (max-width: 375px){
        width: 30%;
    }

`
const TextBox = styled.div`
    width: 20%;
    text-align: center;
    &:last-child{
        flex: 1;
    }
    
`

const UpBox = styled.div`
    width:20%;
    display: flex;
    justify-content: center;
    align-items: center;    

`
const TitleBox = styled.div`
    width: 60%;
    margin-left: 7.5px;
    font-weight: 500;
    font-size: clamp(1rem, 4vmin, 1.25rem);
    @media (max-width: 375px){
        margin-left: 0;
    }
    
`
const ImageBox = styled.div`
    min-width: 75px;
    background: #AAA;
    min-height: 100px;
    @media (max-width: 375px){
        display: none;
    }
    
`

const Image = styled.img`
    width: 100%;
`



export default CardCart