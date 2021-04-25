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
                {`THB${priceWdiscount.toFixed(2)}`}
            </TextBox>
            <TextBox>
                <UpNumber number={quantity} handleNumber={lockClikcing} />
            </TextBox>
            <TextBox>
                {`THB${priceWdiscount.toFixed(2)}`}
            </TextBox>
        </CardCartBox>
    )

}

const CardCartBox = styled.div`
    width: 100%;
    display: flex;
    height: 300px;
    margin: 5px;

`
const ImageTitleBox = styled.div`
    width: 40%;
    display: flex;

`
const TextBox = styled.div`
    width: 20%;
    
`
const TitleBox = styled.div`
    width: 60%;
    padding: 0 10px 0 10px;
    
`
const ImageBox = styled.div`
    width: 40%;
    
`

const Image = styled.img`
    width: 100%;
`



export default CardCart