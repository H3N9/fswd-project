import React from 'react'
import {FormContainer, Input} from '../../styles/styleComponents'

const CouponForm = () => {

    return (
        <FormContainer>
                <Input>                           
                    <input id="publisher" type="text" name="publisher" required value={""} />
                    <label htmlFor="publisher">สำนักพิมพ์</label>
                </Input>
                <Input>                      
                    <input id="author" type="text" name="author" required value={""} />
                    <label htmlFor="author">ผู้เขียน</label>
                </Input>
                <Input>
                    <select type="text" name="types" id="types" value={"product.types"} required >
                        <option value="Discount">Discount</option>
                        <option value="Percent">Percent</option>
                    </select>               
                    <label htmlFor="types">ประเภท</label>
                </Input>
                <Input>                      
                    <input id="author" type="text" name="author" required value={""} />
                    <label htmlFor="author">ผู้เขียน</label>
                </Input>    
        </FormContainer>
    )
}


export default CouponForm