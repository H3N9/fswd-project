import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Box9p, SpaceBox, Button} from '../styles/styleComponents'
import {useLocation, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FacebookIcon from '../images/facebook.png'
import GoogleIcon from '../images/google-plus.png'
import { useOrderContext } from '../context/orderContext'
import UpNumber from '../components/detail/upNumber'
import { PRODUCT_FIND_ONE } from '../graphql/productQuey'
import {useLazyQuery} from '@apollo/client'
import { main } from '../path'

const Detail = () => {
    const location = useLocation()
    const [product, setProduct] = useState({})
    const { productSlug } = useParams()
    const productTitle = productSlug.replace(/-/gi, ' ')
    const [loadProduct, {loading, error, data}] = useLazyQuery(PRODUCT_FIND_ONE, {variables: {object: {title: productTitle}}, fetchPolicy: 'network-only'})

    
    useEffect(() => {
        if(data?.product){
            setProduct(data?.product)
        }
    }, [data])


    useEffect(() => {
        const load = async () => {
            if(location.state){
                setProduct(location.state)
            }
            else{
                await loadProduct()
            }
        }
        load()
    }, [])
    
    const {_id, title = "", price = 0, description = "", image = "", author = "", publisher = "", types = "", netPrice = 0, quantity = 0} = product
    const discount = netPrice !== price
    const { addOrder, orders } = useOrderContext()
    const indexOfProduct = orders.findIndex((product) => product.productId ===  _id)
    const baseProduct = orders[indexOfProduct] || {}
    const defaultOrder = baseProduct?.quantity || 0
    const [number, setNumber] = useState(defaultOrder)

    useEffect(() => {
        setNumber(defaultOrder)
    }, [product])

    const handleNumber = (n, command) => {
        if("Increase" === command && n < quantity){
            setNumber(n + 1)

        }
        else if("Decrease" === command && n > 0){
            setNumber(n - 1)
        }
    }


    const renderSplitText = (descript, index, arr) => {
        const last = arr.length
        if(index !== last){
            return (<React.Fragment key={index}><span >{descript}</span><br /></React.Fragment>)
        }
        else{
            return (<span key={index}>{descript}</span>)
        }
    }

    return (
        <>
            <SpaceBox />
            <Box9p>
                <DetailBox>
                    <ImageBox>
                        <MainImageBox>
                            <MainImage src={(image === "" || image === null) ? "http://ird.rmuti.ac.th/2020/world/upload/post/picture/thumb/IRD291220C00001/noimg.png" : `${main}/image/${image}`} />
                        </MainImageBox>
                        {/* <SecondImageBox>
                            <SecondImage href="" src={image} />
                            <SecondImage src={image} />
                        </SecondImageBox> */}
                        
                    </ImageBox>


                    <InfoBox>
                        <TitleDetial>
                            <TitleDetialText>{title}</TitleDetialText>
                        </TitleDetial>

                        <NormalDetailBox>
                            <NormalDetailText>Author : {author}</NormalDetailText>
                        </NormalDetailBox>

                        <NormalDetailBox>
                            <NormalDetailText>Publisher : {publisher}</NormalDetailText>
                        </NormalDetailBox>

                        <NormalDetailBox>
                            <NormalDetailText>Catgories : {types}</NormalDetailText>
                        </NormalDetailBox>

                        <NormalDetailBox>
                            <NormalDetailText>Quantity : {quantity}</NormalDetailText>
                        </NormalDetailBox>

                        <PriceBox>
                            <PriceTitle>ราคา</PriceTitle>
                            <PriceText>THB{netPrice.toFixed(2)}</PriceText>
                            {discount? <PriceDiscountText>THB{price.toFixed(2)}</PriceDiscountText>:""}
                        </PriceBox>

                        <PackHandle>
                            <UpNumber number={number} handleNumber={handleNumber} />
                            <ButtonAdd onClick={() => addOrder(product, number, "Set")}>
                                <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                                <span>Add</span>
                            </ButtonAdd>   
                        </PackHandle>               
                    </InfoBox>
                </DetailBox>
            </Box9p>
            <SpaceBox />
            <PackHandle>
                <DescriptBox>
                    <DescrtipText >เกี่ยวกับสินค้า</DescrtipText>
                </DescriptBox>
            </PackHandle>
            <Underline />
            <Box9p>
                <TextDescrip>รายละเอียด: <TextTitleDes>{title}</TextTitleDes> </TextDescrip>
                <Ptext>
                    {description.split('\n').map(renderSplitText)}
                </Ptext>
            </Box9p>
            <SpaceBox />
            <SpaceBox />
            
        </>
    )
}

const MainImageBox = styled.div`
    width: 100%;
    padding: 10px 0;
    text-align: center;
    
`
const MainImage = styled.img`
    width: 55%;
    object-fit: cover;
    
`
const TitleDetial = styled.div`
    width: 90%;
    padding: 5%;
`
const TitleDetialText = styled.h1`
    margin: 0;
    font-size: 3em;
`
const NormalDetailBox = styled.div`
    width: 90%;
    padding: 0% 5% 3% 5%;
`
const NormalDetailText = styled.h3`
    margin: 0;
    font-size: 1.3em;
`

const DetailBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
`
const ImageBox = styled.div`
    width: clamp(500px, 40%, 1000px);
    display: flex;
    flex-direction: column;
`

const InfoBox = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: column;
    width: clamp(500px, 60%, 1980px);

`

const PriceBox = styled.div`
    padding: 5%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`
const PriceText = styled.h1`
    margin: 0;
    font-size: clamp(32px, 10vw, 50px);
    margin-right: 30px;
    
`
const PriceTitle = styled.h2`
    margin: 0;
    font-size: clamp(14px, 8vw, 40px);
    margin-right: 35px;
    font-weight: lighter;
`

const PriceDiscountText = styled.h2`
    text-decoration: line-through;
    margin: 0;
    font-size: clamp(14px, 1.8em, 8vw);
    color: gray;
`
const ButtonAdd = styled(Button)`
    background-color: #003cff;
    border: solid 2px #003cff;
    color: white;
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover{
        background-color: white;
        color: #003cff;
    }
    span {
        margin-left: 5px;
    }
`


const PackHandle = styled.div`
    display: flex;
    width: 100%;
    padding: 0 5% 0 5%;
    flex-wrap: wrap;
    align-items: center;
    

`

const Underline = styled.div`
    width: 100%;
    height: 3px;
    background-color: gray;
`

const Ptext = styled.p`
    margin: 0;

`
const DescriptBox = styled.div`
    display: flex;
    border-bottom: solid 3px #003cff;
    padding: 3px 5px 3px 5px;
    width: 100px;
    margin: 2px 5px 50px 5px;
    justify-content: center;

`
const DescrtipText = styled.p`
    margin: 0;
    font-weight: bold;
`
const TextDescrip = styled.h3`
    margin: 0;
    font-weight: bold;
    margin: 50px 30px 50px 0;
    display: flex;
`
const TextTitleDes = styled.span`
    margin-left: 20px;

`



export default Detail