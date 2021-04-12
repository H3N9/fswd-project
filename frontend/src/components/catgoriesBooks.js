import React from 'react'
import {Title, TitleText, Catgories} from '../styles/styleComponents'
import Card from './card'


const CatgoriesBooks = ({books, title}) => {
    return (
        <>
            <Title>
                <TitleText>{title}</TitleText>
            </Title>
            <Catgories>
                {books.map((book) => (<Card key={book.id} book={book} />))}
            </Catgories>
        </>
    )
}

export default CatgoriesBooks