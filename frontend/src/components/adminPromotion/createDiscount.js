import React from 'react'
import styled from 'styled-components'
import { Input } from '../../styles/styleComponents'

const CreateDiscount = ({discountHandle, setIsDiscountCreate, discount, isDiscountCreate, setIsRemove, promotionExist}) => {
    const heightSet = isDiscountCreate? "400px":"0"
    
    return (
        <>
            <ContainerText>
                {isDiscountCreate? (<DotTrue onClick={() => setIsDiscountCreate(false)} />):(<Dot onClick={() => setIsDiscountCreate(true)}  />)}
                <h1>เพิ่มโปรโมชั่น</h1>
                {promotionExist && <button className="delBut" onClick={() => setIsRemove(true)}>ลบ</button>}
            </ContainerText>
            <div style={{...styleForm, height: heightSet}}>
                <Input>
                    <select type="text" name="method" id="method" value={discount.method} required onChange={(e) => discountHandle(e)}>
                        <option value="DISCOUNT">Discount</option>
                        <option value="PERCENT">Percent</option>
                    </select>               
                    <label htmlFor="method">ประเภท</label>
                </Input>
                <Input>       
                    <input type="number" name="discountValue" id="discountValue" value={discount.discountValue} required onChange={(e) => discountHandle(e)}/>                    
                    <label htmlFor="discountValue">จำนวน</label>
                </Input>
                <Input>       
                    <textarea id="" cols="20" rows="5" name="descriptionDiscount" value={discount.descriptionDiscount} onChange={(e) => discountHandle(e)}></textarea>
                    <label htmlFor="">คำอธิบาย</label>
                </Input>
            </div>
        </>
    )
}

const styleForm = {
    width: "100%",
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
}

const ContainerText = styled.div`
    display: flex;
    width: 100%;
    align-items: center;

`

const DotTrue = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: solid 10px #003cff;
    background: white;
    cursor: pointer;
    margin: 13px 20px 0 0;
`
const Dot = styled.div`
    margin: 13px 24px 0 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: solid 3px gray;
    background: white;
    cursor: pointer;
`

export default CreateDiscount

