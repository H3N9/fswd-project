import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { PRODUCT_BY_ID } from '../../graphql/productQuey'
import { UPDATE_PRODUCT } from '../../graphql/productMutation'
import ProductForm from '../../components/adminProduct/productForm'

const UpdateProduct = () => {
    const { productId } = useParams()
    const { data } = useQuery(PRODUCT_BY_ID, {variables: {id: productId}})
    const [ product, setProduct ] = useState(null)
    const [image, setImage] = useState();
    const [ updateProduct ] = useMutation(UPDATE_PRODUCT)

    useEffect(() => {
        if (data?.productById){
            setProduct(data?.productById)
            setImage('http://localhost:3001/image/'+data?.productById?.image)
        }
    }, [data])

    const inputHandle = useCallback((event) =>{
        const {name, value, files} = event.target
        if (name !== "image"){
            setProduct({
                ...product,
                [name]: value
            })
        }
        else{
            const reader = new FileReader();
            reader.onload = () =>{
                if (reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(files[0])
            setProduct({
                ...product,
                [name]: files[0]
            })
        }
    })

    const submitForm = async (e) => {
        console.log('1')
        const { _id, image, quantity, price } = product
        const objInput = {...product, quantity: Number(quantity), price: Number(price) }
        let filename = ''

        // if (image !== ''){
        //     const formData = new FormData()
        //     formData.append('image', image)

        //     const uploadResponse = await fetch('http://localhost:3001/image', { 
        //         method: 'POST',
        //         body: formData
        //     })
        //     const fileData = await uploadResponse.json()
        //     filename = fileData.filename
        // }
        // objInput.image = filename

        try {
            const response = await updateProduct({variables: {id: _id, object: objInput}})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {product !== null && (
                <ProductForm title={`แก้ไขสินค้า`} product={product} image={image} inputHandle={inputHandle} submitForm={submitForm} />
            )}
        </div>
    )
}

export default UpdateProduct