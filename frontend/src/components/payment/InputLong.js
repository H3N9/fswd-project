import React from 'react'
import styled from 'styled-components'
import {Input} from '../../styles/styleComponents'

const InputLong = ({text, behind, command, type, name, value, handle }) => {

    return (
        <Input>            
            <input type={type} name={name} value={value} id={"Asd"} onChange={(e) => { handle(e) }} required/>
            <label htmlFor={name}>{text} {behind}</label>
        </Input>
    )
}


export default InputLong