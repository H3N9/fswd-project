import React from 'react'
import styled from 'styled-components'


const Select = ({text}) => {


    return (
        <BoxInput>
            <BoxLabelInput>
                <LabelText>
                    {text} 
                </LabelText>
                <SelectInput >
                    <option value="ไทย">ไทย</option>
                    <option value="อังกฤษ">อังกฤษ</option>
                    <option value="ตรุกี">ตรุกี</option>
                </SelectInput>
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
    width: 92.5%;
    height: 60px;
    display: flex;
    margin: 10px;
    flex-direction: column;

`
const LabelText = styled.h4`
    margin: 0;
`
const SelectInput = styled.select`
    border: none;
    outline: none;
    border-radius: 15px;
    border: solid 1px gray;
    width: 100%;
    height: 60px;
`

export default Select