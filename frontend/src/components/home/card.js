import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types"
import { useOrderContext } from '../../context/orderContext'


const Card = ({product}) => {
    const {title = "", price = 0, _id = 0, image = ""} = product
    const discount = 0
    const quantity = product?.quantity > 0 ? true:false
    const { addOrder } = useOrderContext()

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
                pathname: `/detail/${_id}`,
                state: product,
            }
        } style={{textDecoration: "none"}}>
            <BoxCard>
                <StateGoods>
                    {renderState(quantity)}
                </StateGoods>

                <ImageBox>
                    <Image src={"http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png"} />
                </ImageBox>

                <AddCart>
                    <Button onClick={() => addOrder([product])}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <p>{"เพิ่มไปยังรถเข็น"}</p>
                    </Button>
                    
                </AddCart>          

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
    width: 270px;
    display: flex;
    flex-direction: column;
    height: 475px;
    overflow: hidden;
    padding: 25px 15px;
    margin: 0 15px;
    transition: 0.35s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    :hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        z-index: 1;
    }
    @media (max-width: 420px){
        width: 150px;
        height: 325px;
        margin: 0 5px;
    }
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

const TitleBox = styled(Box)`

`
const TitleText = styled.h3`
    margin: 0;
    font-size: clamp(20px, 5vmin,1.5rem);
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
const PriceText = styled.h2`
    margin: 0;
    text-decoration: line-through;
    color: gray;
`
const DiscountText = styled.h1`
    margin: 0;
    color: black;
    font-weight: 600;
    font-size: clamp(25px, 6vmin, 2rem);
`

const Button = styled.button`
    outline: none;
    border-radius: 50px;
    border: solid 2px #003cff;
    font-size: 1.2em;
    background: white;
    padding: 0px 4.5vmin 0px 4.5vmin;
    cursor: pointer;
    transition: 0.5s;
    color: #003cff;
    display: flex;
    align-items: center;
    svg{
        @media(max-width: 414px){
            display: none;
        }
    }
    p{
        margin: 0 0 0 7px;
        padding: 5px 0;
        font-size: clamp(0.9rem, 3vmin, 1.1rem);
    }
    :hover{
        border: solid 2px #003cff;
        background: #003cff;
        color: white;
    }
`

Card.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
}



export default Card