import React from 'react'
import styled from 'styled-components'


const Discount = ({promotion, price, netPrice}) => {
    return(
        <>
            {promotion? (
                <>
                    <PriceBox>
                        {(<PriceText>THB{price.toFixed(2)}</PriceText>)}
                    </PriceBox>
                    <DiscountBox>
                        {(<DiscountText>THB{(netPrice).toFixed(2)}</DiscountText>)}
                    </DiscountBox>
                </>
                
            )
                :
            (
                <>
                    <PriceBox>
                    </PriceBox>
                    <DiscountBox>
                        {(<DiscountText>THB{(price).toFixed(2)}</DiscountText>)}
                    </DiscountBox>
                </>
                
            )
            }
        
        </>
    )
}
const Box = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
const PriceBox = styled(Box)`
    background: white;
    height: 8%;
`

const DiscountBox = styled(Box)`
    background: white;
    height: 10%;
`
const PriceText = styled.h3`
    margin: 0;
    text-decoration: line-through;
    color: gray;
`
const DiscountText = styled.h1`
    margin: 0;
    color: black;
    font-weight: 600;
    font-size: clamp(21px, 6vmin, 1.8rem);
`

export default Discount