import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types"
import { useOrderContext } from '../pages/index'


const Card = ({book}) => {
    const {title = "", image = "", price = 0, discount = 0, rates = 0, id = 0} = book
    const quantity = book?.quantity > 0 ? true:false
    const { addOrder } = useOrderContext()

    const rateHandle = (rates) => {
        const amount = rates.length
        if(amount > 0){
            const star = rates.reduce((rate1, rate2) => rate1 + (rate2["rate"]||0), 0)/amount
            return(
                <PackStar>
                    {rederStar(star-0, 1)}
                    {rederStar(star-1, 2)}
                    {rederStar(star-2, 3)}
                    {rederStar(star-3, 4)}
                    {rederStar(star-4, 5)}
                    <ReviewText>{`Review(${amount})`}</ReviewText>
                </PackStar>
            )
        }
        
    }

    const rederStar = (rate, key) => {
        if(rate >= 1) {
            return <FontAwesomeIcon style={{color: "#e0ac18"}} key={key} icon={['fas', 'star']}  />
        }
        else if(rate > 0.5){
            return <FontAwesomeIcon style={{color: "#e0ac18"}} key={key} icon={['fas', 'star-half-alt']}  />
        }
        else {
            return <FontAwesomeIcon style={{color: "#e0ac18"}} key={key} icon={['far', 'star']}  />
        }
    }

    const discountFuc = (discount, price) => {
        if(discount){
            return(
                <>
                    <PriceBox>
                        {(<PriceText>THB{price.toFixed(2)}</PriceText>)}
                    </PriceBox>

                    <DiscountBox>
                        {(<DiscountText>THB{(price-discount).toFixed(2)}</DiscountText>)}
                    </DiscountBox>
                </>
            )
        }
        else{
            return(
                <>
                    <PriceBox>
                    </PriceBox>
                    <DiscountBox>
                        {(<DiscountText>THB{(price).toFixed(2)}</DiscountText>)}
                    </DiscountBox>
                </>
            )
        }
    }

    const renderState = (quantity) => {
        if(quantity){
            return (
                <PtextPass>
                    <FontAwesomeIcon icon={['fas', 'check-circle']} />
                    <span> มีสินค้า</span>
                </PtextPass>
            )
        }
        else{
            return (
                <PtextFail>
                    <FontAwesomeIcon icon={['fas', 'times-circle']} />
                    <span> ไม่มีสินค้า</span>
                </PtextFail>
            )
        }
    }


    return (
        <Link to={
            {
                pathname: `/detail/${id}`,
                state: book,
            }
        } style={{textDecoration: "none"}}>
            <BoxCard>
                <StateGoods>
                    {renderState(quantity)}
                </StateGoods>

                <ImageBox>
                    <Image src={image} />
                </ImageBox>

                <AddCart>
                    <Button onClick={() => addOrder([book])}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        {" AddCart"}
                    </Button>
                    
                </AddCart>

                <RateBox>
                    {rateHandle(rates)}
                </RateBox>                

                <TitleBox>
                    <TitleText>{title}</TitleText>
                </TitleBox>

                {discountFuc(discount, price)}

            </BoxCard>
        </Link>
    )
}

const Box = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
const AddCart = styled.div`
    display: flex;
    width: 100%;
    height: 10%;
    padding: 5px 0 5px 0;
    justify-content: center;
`

const BoxCard = styled.div`
    display: flex;
    width: 300px;
    height: 400px;
    overflow: hidden;
    flex-direction: column;
    flex-shrink: 0;
    margin: 1vw;
    transition: 0.35s;
    padding: 25px 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    :hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        z-index: 1;

    }
`

const PackStar = styled(Box)`
    align-items: center;
`

const StateGoods = styled(Box)`
    background: white;
    height: 6%;
    
`

const ImageBox = styled.div`
    height: 54%;
    background: white;
    padding: 0 5% 0 5%;
    justify-content: center;
    display: flex;
    
`
const Image = styled.img`
    object-fit: cover;
    height: 100%;
`

const RateBox = styled(Box)`
    background: white;
    height: 6%;
`

const TitleBox = styled(Box)`
    background: white;
    height: 6%;
`
const TitleText = styled.h3`
    margin: 0;
    color: black;
`

const PriceBox = styled(Box)`
    background: white;
    height: 8%;
`

const DiscountBox = styled(Box)`
    background: white;
    height: 10%;
`
const PtextPass = styled.p`
    margin: 0;
    color: green;

`

const PtextFail = styled.p`
    margin: 0;
    color: red;
`

const ReviewText = styled.span`
    color: gray;
    margin-left: 5px;
`
const PriceText = styled.h2`
    margin: 0;
    text-decoration: line-through;
    color: gray;
`
const DiscountText = styled.h1`
    margin: 0;
    color: black;
`

const Button = styled.button`
    outline: none;
    border-radius: 20px;
    border: solid 2px #003cff;
    font-size: 1.2em;
    background: white;
    padding: 3px 50px 3px 50px;
    cursor: pointer;
    transition: 0.5s;
    color: #003cff;
    :hover{
        border: solid 2px #003cff;
        background: #003cff;
        color: white;
    }
`

Card.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        rates: PropTypes.array.isRequired,
        discount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
}



export default Card