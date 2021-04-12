import React from 'react'
import styled from 'styled-components'
import {Button} from '../styles/styleComponents'
import {Link} from 'react-router-dom'

const Summary = ({totle}) => {
    const shipping = totle? 1:0
    const result = shipping + totle || 0
    return (
        <SummaryBox>
            <TitleHead>
                สรุปคำสั่งซื้อ
            </TitleHead>
            <TextBox>
                <NormalText>ยอดรวม</NormalText>
                <NormalText>THB{totle || 0}</NormalText>
            </TextBox>
            <TextBox>
                <NormalText>ค่าส่ง</NormalText>
                <NormalText>THB{shipping}</NormalText>
            </TextBox>
            <BreakBetween />
            <Linebreak />
            <BreakBetween />
            <TextBox>
                <NormalText>ยอดสุทธิ</NormalText>
                <NormalText>THB{result}</NormalText>
            </TextBox>
            <BreakBetween />
            <Link to="/payment">
                <ButtonCheck>ชำระเงิน</ButtonCheck>
            </Link>
        </SummaryBox>
    )
}

const SummaryBox = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #f1f1f1;
`
const TitleHead = styled.h1`
    margin: 30px 10% 30px 10%;
    display: flex;
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