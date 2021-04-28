import React from 'react'
import {FormContainer, Input} from '../../styles/styleComponents'

const CouponForm = ({title, setCoupon, submitHandle, coupon}) => {

    const inputHandle = (e) => {
        const {value, name} = e.target
        setCoupon({
            ...coupon,
            [name]: value
        })
    }

    return (
        <FormContainer onSubmit={(e) => submitHandle(e)}>
            <h1>{title}</h1>
                <Input>                           
                    <select type="text" id="method" name="method" value={coupon.method} required onChange={inputHandle}>
                        <option value="DISCOUNT">Discount</option>
                        <option value="PERCENT">Percent</option>
                    </select>
                    <label htmlFor="method">ประเภท</label>
                </Input>
                <Input>                      
                    <input id="discountValue" type="number" name="discountValue" required value={coupon.discountValue} onChange={inputHandle} />
                    <label htmlFor="discountValue">value</label>
                </Input>
                <Input>
                    <input id="promotionCode" type="text" name="promotionCode" required value={coupon.promotionCode} onChange={inputHandle}/>
                    <label htmlFor="promotionCode">Code</label>
                </Input>
                <Input>                      
                    <input id="quantity" type="number" name="quantity" required value={coupon.quantity} onChange={inputHandle}/>
                    <label htmlFor="quantity">จำนวน</label>
                </Input>
                <Input>       
                    <textarea id="" cols="20" rows="5" name="description" value={coupon.description} onChange={inputHandle}></textarea>
                    <label htmlFor="">คำอธิบาย</label>
                </Input>
                <button>ยืนยัน</button> 
        </FormContainer>
    )
}


export default CouponForm