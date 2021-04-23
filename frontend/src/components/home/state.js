import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const State = ({quantity}) => {
    return (
        <StateGoods>
            {quantity? (
                <PtextPass>
                    <FontAwesomeIcon icon={['fas', 'check-circle']} />
                    <span> มีสินค้า</span>
                </PtextPass>
            )
                :
            (
                <PtextFail>
                    <FontAwesomeIcon icon={['fas', 'times-circle']} />
                    <span> ไม่มีสินค้า</span>
                </PtextFail>
            )}
        </StateGoods>
        
    )
}


const StateGoods = styled.div`
    background: white;
    height: 6%;
    display: flex;
    width: 100%;
    align-items: center;
`
const PtextPass = styled.p`
    margin: 0;
    color: green;

`

const PtextFail = styled.p`
    margin: 0;
    color: red;
`

export default State