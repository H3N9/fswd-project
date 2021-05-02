import React from 'react'
import styled from 'styled-components'

const Loading = () => {
    return(
        <Container><div class="lds-ring"><div></div><div></div><div></div><div></div></div></Container>
    )
}



const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
export default Loading