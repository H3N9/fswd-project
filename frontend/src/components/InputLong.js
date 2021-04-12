import React from 'react'
import styled from 'styled-components'


const InputLong = ({text, behind, command, type}) => {
    return (
        <BoxInput>
            <BoxLabelInput>
                <LabelText>
                    {text} 
                    <CommandText style={{color:command}}>
                        {behind}
                    </CommandText>
                </LabelText>
                <Input type={type} />
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
    width: 92%;
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
const CommandText = styled.span`
    color: black;
    margin-left: 10px;
`


export default InputLong