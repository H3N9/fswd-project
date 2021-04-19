import React from 'react'
import {Title, TitleText, Catgories} from '../../styles/styleComponents'
import Card from './card'


const CatgoriesBooks = ({products, title}) => {
    return (
        <>
            <Title>
                <TitleText>{title}</TitleText>
            </Title>
            <Catgories>
                {products?.map((product, index) => (<Card key={index} product={product} />))}
            </Catgories>
        </>
    )
}

export default CatgoriesBooks