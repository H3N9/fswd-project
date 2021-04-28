import React from 'react'
import styled from 'styled-components'
import {Input, FromInline} from '../../styles/styleComponents'

const InputDouble = ({text1, text2, name1, name2, value1, value2, handle}) => {
    return (
        <FromInline>
            <Input>     
                <input name={name1} value={value1} onChange={(e) => {handle(e)}} required />
                <label htmlFor="">{text1}</label>
            </Input>
            <Input>            
                <input name={name2} value={value2} onChange={(e) => {handle(e)}} required />
                <label htmlFor="">{text2}</label>
            </Input>
        </FromInline>
    )
}


export default InputDouble