import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { PRODUCT_BY_ID } from '../../graphql/productQuey'
import { UPDATE_PRODUCT } from '../../graphql/productMutation'
import ProductForm from '../../components/adminProduct/productForm'
import ModalResult from '../../components/modalResult'
import Response from '../../components/response'
import {CREATEDISCOUNT_MUTATION} from '../../graphql/createDiscountMutation'

const UpdateProduct = () => {
    const { productId } = useParams()
    const { data } = useQuery(PRODUCT_BY_ID, {variables: {id: productId}})
    const [ product, setProduct ] = useState(null)
    const [image, setImage] = useState();
    const [isImageChange, setIsImageChange] = useState(false)
    const [ updateProduct, {error} ] = useMutation(UPDATE_PRODUCT)
    const [ isUpdate, setIsUpdate ] = useState(undefined)
    const [createDiscount, {error: errorDiscount}] = useMutation(CREATEDISCOUNT_MUTATION)
    const [discount, setDiscount] = useState({
        discountValue: 0,
        method: "DISCOUNT",
        descriptionDiscount: ""
    })

    const UpdateResponse = () => {
        if(isUpdate === "Success"){
            return (
                <ModalResult title="Success" icon="check" color="#22aa4b" setIsCreate={setIsUpdate} />
            )
        }
        else if(isUpdate === "Fail"){
            return (
                <ModalResult title="Fail to Update" icon="times" setIsCreate={setIsUpdate} color="#a82626" />
            )
        }
        else{
            return (
                <></>
            )
        }
    }

    useEffect(() => {
        if (data?.productById){
            setProduct(data?.productById)
            setImage('http://localhost:3001/image/'+data?.productById?.image)
        }
    }, [data])

    const discountHandle = (e) => {
        const { name, value } = e.target
        setDiscount({
            ...discount,
            [name]: value
        })
    }

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
        const { _id } = product
        const reStruct  = {
            price: Number(product.price),
            publisher: product.publisher,
            quantity: Number(product.quantity),
            title: product.title,
            types: product.types,
            image: product.image,
            description: product.description,
            author: product.author
        }
        const discountRestruct = {
            productId: _id,
            discountValue: Number(discount.discountValue),
            method: discount.method,
            description: discount.descriptionDiscount
        }
        console.log(discountRestruct)
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
            await createDiscount({variables: {record: discountRestruct}})
            setIsUpdate("Success")
            console.log(response)
        } catch (e) {
            console.log(error, e.message)
            setIsUpdate("Fail")
        }
    }

    return (
        <div>
            <Response state={isUpdate} setState={setIsUpdate} />
            {product !== null && (
                <ProductForm title={`แก้ไขสินค้า`} product={product} discount={discount} discountHandle={discountHandle} image={image} 
                inputHandle={inputHandle} submitForm={submitForm} />
            )}
        </div>
    )
}

export default UpdateProduct