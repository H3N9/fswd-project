import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UpNumber = ({number, handleNumber}) => {

    return (
        <PackNumber>
            <PackText>
                {number}
            </PackText>
            <PackButton>
                <IncreaseBox onClick={() => handleNumber(number, "Increase")} >
                    <FontAwesomeIcon icon={['fas', 'caret-up']} />
                </IncreaseBox>
                <DecreaseBox onClick={() => handleNumber(number, "Decrease")} >
                    <FontAwesomeIcon icon={['fas', 'caret-down']} />
                </DecreaseBox>
            </PackButton>
        </PackNumber>
    )
}


const PackNumber = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 150px;
    height: 55px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #cccccc;
    
`
const PackText = styled.div`
    width: 80%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PackButton = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100%;
    background-color: transparent;
`
const DecreaseBox = styled.div`
    width: 100%;
    height: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover{
        background-color: #adacac
    }

`
const IncreaseBox = styled.div`
    width: 100%;
    height: 50%;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    :hover{
        background-color: #adacac
    }
`

export default UpNumber