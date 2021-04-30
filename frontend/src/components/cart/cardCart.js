import React from 'react'
import styled from 'styled-components'
import UpNumber from '../detail/upNumber'


const CardCart = ({product, quantity, addOrder}) => {
    const {image = "", title = "", price = 0, promotion = {}, netPrice = 0} = product

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

                </ImageBox>
            </ImageTitleBox>

            <TextBoxPack>
                <TextBox>
                    <TitleText>{title}</TitleText>
                </TextBox>
                
                <TextBox>
                    <HeadText>จำนวน: </HeadText>
                    <UpNumber number={quantity} handleNumber={lockClikcing} />
                </TextBox>
                <TextBox>
                    <HeadText>ราคา: </HeadText>
                    <NormalText>{netPrice}/ชิ้น</NormalText>
                </TextBox>
                <TextBox>
                    <HeadText>ส่วนลด: </HeadText>
                    <NormalText>{price-netPrice}/ชิ้น</NormalText>
                </TextBox>
                <TextBox>
                    <HeadText>ทั้งหมด: </HeadText>
                    <NormalText>{netPrice*quantity} บาท</NormalText>
                </TextBox>
            </TextBoxPack>
            
           
        </CardCartBox>
    )

}

const CardCartBox = styled.div`
    width: 100%;
    display: flex;
    min-height: 350px;
    margin: 5px;
    flex-wrap: wrap;
    justify-content: center;

`
const ImageTitleBox = styled.div`
    width: clamp(250px, 30%, 400px);
    display: flex;
    background-color: blue;
    flex-direction: column;
    align-items: center;

`
const TextBoxPack = styled.div`
    width: clamp(350px, 70%, 600px);
    min-height: 350px;
    display: flex;
    background-color: white;
    flex-direction: column;
`
const ImageBox = styled.div`
    width: 100%;
    height: 100%;
    min-height: 350px;
    background-color: green;
`
const TextBox = styled.div`
    width: 100%;
    min-height: 70px;
    display: flex;
    align-items: center;
    padding-left: 10px;
`
const HeadText = styled.h2`
    margin: 0;
    margin-right: 10px;
`
const TitleText = styled.h1`
    margin: 0;
`
const NormalText = styled.h2`
    margin: 0;
`


/*<TextBox>
                    {`THB${priceWdiscount.toFixed(2)}`}
                </TextBox>
                <TextBox>
                    <UpNumber number={quantity} handleNumber={lockClikcing} />
                </TextBox>
                <TextBox>
                    {`THB${priceWdiscount.toFixed(2)}`}
                </TextBox>*/ 

export default CardCart