import React from 'react'
import styled from 'styled-components'

const InputDouble = ({text1, text2}) => {
    return (
        <BoxInput>
            <BoxLabelInput>
                <LabelText>{text1}</LabelText>
                <Input />
            </BoxLabelInput>
            <BoxLabelInput>
                <LabelText>{text2}</LabelText>
                <Input />
            </BoxLabelInput>
        </BoxInput>
    )
}

const BoxInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

`
const BoxLabelInput = styled.div`
    width: 45%;
    height: 60px;
    display: flex;
    margin: 10px;
    flex-direction: column;

`
const LabelText = styled.h4`
    margin: 0;
`
const Input = styled.input`
    border: none;
    outline: none;
    border-radius: 15px;
    border: solid 1px gray;
    width: 100%;
    height: 80px;
`

export default InputDouble