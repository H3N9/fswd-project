import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PromotionCard = ({promotion, index, countPage}) => {
    const {_id = "", createdAt = "", updatedAt = "", type = "",
    method = "", description = "", promotionCode = "",
    createdAtWithFormatDateTime, updatedAtWithFormatDateTime} = promotion
    const created = new Date(createdAt)
    const updated = new Date(updatedAt)
    const title = (promotionCode === '')?`${promotion?.description}`:promotionCode
    //const gradientBackground = (type === 'DiscountPrice')?['#5128e6', '#2891e6']:['#ff9b58', '#fc6d0e']
    const editLink = (type === 'Coupon')?`/admin/promotion/${_id}`:`/admin/product/${promotion?.product?._id}`

    return (
        <PromotionItem>
            <Info>
                <Name>
                    <h2>{title}</h2>
                </Name>
                <Detail>
                        <p><b>ประเภทโปรโมชั่น :</b> {type}</p>
                        {(type === 'DiscountPrice') && (<p><b>สินค้า : </b> {promotion?.product?.title}</p>)}
                        <p><b>รูปแบบส่วนลด : </b> {method}</p>
                </Detail>
                
            </Info>
            <Option>
                <Link to={editLink}>
                    <button className="edit"  name="แก้ไขโปรโมชั่น"><FontAwesomeIcon icon={['fas', 'edit']} /> แก้ไข</button>
                </Link>
                <button className="delete" name="ลบโปรโมชั่น" ><FontAwesomeIcon icon={['fas', 'trash-alt']}/> ลบ</button>
            </Option>
         </PromotionItem>
    )
}
const PromotionItem = styled.div`
    width: 650px;
    max-width: 100%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    color :#FFF;
    padding: 20px 25px;
    background-image: linear-gradient(120deg,  #fa8d45, #fc6d0e);
    margin: 10px;
`

const Info = styled.div`
    display: flex;
    width:100%;
    flex-wrap: wrap;
    position: relative;
`

const Id = styled.div`
    width: 100px;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Name = styled.div`
    margin-right: 20px;
    display:flex;
    background: #FFF;
    width: fit-content;
    border-radius: 5px;
    align-items: center;
    
    h2{
        font-weight: 500;
        color: #fa8d45;
        padding: 0 10px;
        margin: 10px 0;
        font-size: clamp(1.2rem,8vmin,1.9rem);
    }
`

const Detail = styled.div`
    p{
        margin: 10px 0;
        font-size: clamp(1rem, 5vmin,1.25rem);
        b{
            font-weight: 500;
        }
    }
`

const Option = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    button{
        min-width: 90px;
        max-width: 125px;
        height: 40px;
        border-radius: 5px;
        margin: 0px 25px 0px 0;
        background: #FFF;
        border: none;
        font-size: 1.1rem;
        svg{
            font-size: 20px;
            color: #111;
            transition: 0.25s;
        }
    }

`

export default PromotionCard