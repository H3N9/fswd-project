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
                    <TitleText><b>{title}</b></TitleText>
                </TextBox>
                
                <TextBox>
                    <HeadText><b>จำนวน:</b> </HeadText>
                    <UpNumber number={quantity} handleNumber={lockClikcing} />
                </TextBox>
                <TextBox>
                    <HeadText><b>ราคา:</b> </HeadText>
                    <NormalText>{netPrice}/ชิ้น</NormalText>
                </TextBox>
                <TextBox>
                    <HeadText><b>ส่วนลด:</b> </HeadText>
                    <NormalText>{price-netPrice}/ชิ้น</NormalText>
                </TextBox>
                <TextBox>
                    <HeadText><b>ทั้งหมด:</b> </HeadText>
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
    margin: 25px 5px;
    flex-wrap: wrap;
    justify-content: center;
    background: #FFF;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;

`
const ImageTitleBox = styled.div`
    width: clamp(250px, 30%, 400px);
    display: flex;
    background-color: blue;
    flex-direction: column;
    align-items: center;
    border-radius: 10px 0 0 10px;

`
const TextBoxPack = styled.div`
    width: clamp(350px, 70%, 600px);
    min-height: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
`
const ImageBox = styled.div`
    width: 100%;
    height: 100%;
    min-height: 350px;
    background-color: #888;

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

export default CardCart