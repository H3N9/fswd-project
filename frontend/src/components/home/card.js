import React, { createRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from "prop-types"
import { useOrderContext } from '../../context/orderContext'
import State from './state'
import Discount from './discount'


const Card = ({product}) => {
    const {title = "", price = 0, _id = 0, image = "", netPrice = 0, promotion} = product
    const quantity = product?.quantity > 0 ? true:false
    const { addOrder } = useOrderContext()
    const history = useHistory()
    const ignoreClick = createRef()


    const addCart = (e) => {
        const svgTag = ignoreClick.current.firstChild
        const path = ignoreClick.current.firstChild.firstChild
        const pText = ignoreClick.current.lastChild
        const buttonAdd = ignoreClick.current
        console.log(e.target == svgTag)
        if(e.target !== svgTag && e.target !== buttonAdd && e.target !== pText && e.target !== path){
            const location = {
                pathname: `/detail/${_id}`,
                state: product,
            }
            history.push(location)
        }
        
    }

    return (
            <BoxCard onClick={addCart} >
                <State quantity={quantity}/>

                <ImageBox  >
                    <Image src={"http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png"} />
                </ImageBox>

                <AddCart >
                    <Button ref={ignoreClick} onClick={() => addOrder(product, 1)}>
                        <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                        <p>{"เพิ่มลงรถเข็น"}</p>
                    </Button>
                    
                </AddCart>          

                <TitleBox >
                    <TitleText>{title}</TitleText>
                </TitleBox>

                <Discount price={price} promotion={promotion} netPrice={netPrice} />

            </BoxCard>
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
    cursor: pointer;
    width: 270px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 475px;
    overflow: hidden;
    padding: 25px 15px;
    margin: 20px 15px;
    transition: 0.35s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    :hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        z-index: 1;
    }
    @media (max-width: 420px){
        width: 36.25%;
        height: 325px;
        margin: 5px;
    }
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
const Button = styled.button`
    outline: none;
    border-radius: 50px;
    border: solid 2px #003cff;
    font-size: 1.2em;
    background: white;
    width:80%;
    cursor: pointer;
    transition: 0.5s;
    color: #003cff;
    display: flex;
    align-items: center;
    justify-content:center;
    @media (max-width: 420px){
        width:100%;
    }
    svg{
        margin-right: 5px;
        @media(max-width: 414px){
            display: none;
        }
    }
    p{
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
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
}



export default Card