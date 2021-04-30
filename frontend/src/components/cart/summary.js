import React from 'react'
import styled from 'styled-components'
import {Button} from '../../styles/styleComponents'
import {Link} from 'react-router-dom'

const Summary = ({total}) => {
    const shipping = total? 1:0
    const result = shipping + total || 0
    return (
        <SummaryBox>
            <TitleHead>
                สรุปคำสั่งซื้อ
            </TitleHead>
            <TextBox>
                <NormalText>ยอดรวม</NormalText>
                <NormalText>{total || 0} บาท</NormalText>
            </TextBox>
            <TextBox>
                <NormalText>ค่าส่ง</NormalText>
                <NormalText>{shipping} บาท</NormalText>
            </TextBox>
            <BreakBetween />
            <Linebreak />
            <BreakBetween />
            <TextBox>
                <NormalText>ยอดสุทธิ</NormalText>
                <NormalText>{result} บาท</NormalText>
            </TextBox>
            <BreakBetween />
            <Link to="/checkout">
                <ButtonCheck>ชำระเงิน</ButtonCheck>
            </Link>
        </SummaryBox>
    )
}

const SummaryBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    position: sticky;
    top: 20%;
    padding: 10px 20px 40px 20px;
    background: #FFF;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`
const TitleHead = styled.h1`
    margin: 30px 10% 30px 10%;
    display: flex;
    font-weight: bold;
`
const TextBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 10%;
`
const NormalText = styled.h4`
    margin: 5px 5px 5px 10%;

`
const BreakBetween = styled.div`
    width: 100%;
    height: 30px;
`
const Linebreak = styled.div`
    width: 80%;
    height: 2px;
    background-color: gray;
    margin: 0 10% 0 10%;

`
const ButtonCheck = styled(Button)`
    border: solid 3px #003cff;
    background: #003cff;
    color: white;
    width: 80%;
    margin-left: 10%;
    :hover{
        color:  #003cff;
        background: white;
    }
`


export default Summary