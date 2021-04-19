import React from 'react'
import styled from 'styled-components'


const InputRadio = ({text, state, handle}) => {

    const stateChecking = (state, text) => {
        if(state === text){
            return (
                <BoxCheckTrue>
                    <DotTrue onClick={() => handle(text)} />
                    <Text>{text}</Text>
                </BoxCheckTrue>
            )   
        }
        else{
            return (
                <BoxCheck>
                    <Dot onClick={() => handle(text)} />
                    <Text>{text}</Text>
                </BoxCheck>
            )
        }
    }
    return (
        <>
        {stateChecking(state, text)}
        </>
    )
}

const BoxCheck = styled.div`
    width: 100%;
    display: flex;
    height: 80px;
    align-items: center;
    padding: 20px;
    border: solid 3px #f1f1f1;
    margin: 10px 0 10px 0;
`

const Dot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: solid 3px gray;
    background: white;
    cursor: pointer;
`

const BoxCheckTrue = styled.div`
    width: 100%;
    display: flex;
    height: 80px;
    align-items: center;
    padding: 20px;
    border: solid 3px #003cff;
    margin: 10px 0 10px 0;
`

const DotTrue = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: solid 10px #003cff;
    background: white;
    cursor: pointer;
`

const Text = styled.h1`
    margin: 0;
    margin-left: 10px;
`


export default InputRadio