import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { PRODUCT_BY_ID } from '../../graphql/productQuey'
import { UPDATE_PRODUCT } from '../../graphql/productMutation'
import ProductForm from '../../components/adminProduct/productForm'
import ModalResult from '../../components/modalResult'

const UpdateProduct = () => {
    const { productId } = useParams()
    const { data } = useQuery(PRODUCT_BY_ID, {variables: {id: productId}})
    const [ product, setProduct ] = useState(null)
    const [image, setImage] = useState();
    const [isImageChange, setIsImageChange] = useState(false)
    const [isSuccess, setIsSuccess] = useState(undefined);
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
            setIsImageChange(true)
        }
    })

    const submitForm = async (e) => {
        e.preventDefault()
        const { _id, quantity, price } = product
        const reStruct  = {
            price: product.price,
            publisher: product.publisher,
            quantity: product.quantity,
            title: product.title,
            tpyes: product.tpyes,
            image: product.image,
            description: product.description,
            author: product.author
        }
        //const objInput = {...product, quantity: Number(quantity), price: Number(price) }
        let filename = ''

        if (isImageChange){
            const formData = new FormData()
            formData.append('image', product.image)

            const uploadResponse = await fetch('http://localhost:3001/image', { 
                method: 'POST',
                body: formData
            })
            const fileData = await uploadResponse.json()
            filename = fileData.filename
            reStruct.image = filename
        }

        try {
            const response = await updateProduct({variables: {id: _id, object: reStruct}})
            setIsSuccess("success")
        } catch (error) {
            console.log(error)
            setIsSuccess("fail")
        }
    }

    return (
        <div>
            {isSuccess === "success" ? <ModalResult title="แก้ไขสินค้าสำเร็จ" icon="check" color="#22aa4b" setIsCreate={setIsSuccess}/> : isSuccess === "fail" ? <ModalResult title="แก้ไขสินค้าไม่สำเร็จ" icon="times" color="#a82626" setIsCreate={setIsSuccess}/> : null}
            {product !== null && (
                <ProductForm title={`แก้ไขสินค้า`} product={product} image={image} 
                inputHandle={inputHandle} submitForm={submitForm} />
            )}
        </div>
    )
}

export default UpdateProduct