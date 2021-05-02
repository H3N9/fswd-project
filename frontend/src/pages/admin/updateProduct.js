import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/client'
import { PRODUCT_BY_ID } from '../../graphql/productQuey'
import { UPDATE_PRODUCT } from '../../graphql/productMutation'
import ProductForm from '../../components/adminProduct/productForm'
import Response from '../../components/response'
import {CREATEDISCOUNT_MUTATION, UPDATEPROMOTION_MUTATION} from '../../graphql/createDiscountMutation'
import {REMOVEDISCOUNT_MUTATION} from '../../graphql/removeDiscount'

const UpdateProduct = () => {
    const { productId } = useParams()
    const [loadProduct, { data }] = useLazyQuery(PRODUCT_BY_ID, {variables: {id: productId}, fetchPolicy: 'no-cache'})
    const [ product, setProduct ] = useState(null)
    const [image, setImage] = useState();
    const [isImageChange, setIsImageChange] = useState(false)
    const [ updateProduct, {error} ] = useMutation(UPDATE_PRODUCT)
    const [ isUpdate, setIsUpdate ] = useState(undefined)
    const [createDiscount] = useMutation(CREATEDISCOUNT_MUTATION)
    const [updateDiscount] = useMutation(UPDATEPROMOTION_MUTATION)
    const [removeDiscount] = useMutation(REMOVEDISCOUNT_MUTATION)
    const [isDiscountCreate, setIsDiscountCreate] = useState(false)
    const [isRemove, setIsRemove] = useState(false)
    const [discount, setDiscount] = useState({
        discountValue: 0,
        method: "DISCOUNT",
        descriptionDiscount: ""
    })
    const [promotionExist, setPromotionExist] = useState(false)

    useEffect(() => {
        console.log(data)
        if (data?.productById){
            setProduct(data?.productById)
            if(data?.productById?.promotion){
                const promotion = data?.productById?.promotion
                setDiscount({
                    discountValue: promotion?.discountValue || 0,
                    method: promotion?.method || "DISCOUNT",
                    descriptionDiscount: promotion?.description || "",
                    type: promotion?.type,
                    id: promotion._id
                })
                setIsDiscountCreate(true)
                setPromotionExist(true)
            }
            else{
                setDiscount({
                    discountValue: 0,
                    method: "DISCOUNT",
                    descriptionDiscount: ""
                })
                setIsDiscountCreate(false)
                setPromotionExist(false)
            }
            setImage('http://localhost:3001/image/'+data?.productById?.image)
        }
    }, [data])

    useEffect(() => {
        const load = async () => {
            await loadProduct()
        }
        load()
    }, [])

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
            try{
                reader.readAsDataURL(files[0])
                setProduct({
                    ...product,
                    [name]: files[0]
                })
            setIsImageChange(true)
            }
            catch(error){
                console.log(error)
            }
        }
    })

    const discountPack = {
        discountHandle, 
        discount, 
        isDiscountCreate,  
        setIsDiscountCreate,
        promotionExist,
        setIsRemove,
    }

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
            const createDiscountFuc = async () => {
                if(isDiscountCreate && !promotionExist){
                    const discountRestruct = {
                        productId: _id,
                        discountValue: Number(discount.discountValue),
                        method: discount.method,
                        description: discount.descriptionDiscount
                    }
                    await createDiscount({variables: {record: discountRestruct}})
                    console.log("create discount")
                }
                else if(promotionExist && !isRemove){
                    const discountRestruct = {
                        discountValue: Number(discount.discountValue),
                        method: discount?.method || "DISCOUNT",
                        description: discount?.descriptionDiscount,
                        type: discount?.type,
                    }
                    await updateDiscount({variables: {record: discountRestruct, id: discount.id}})
                    console.log("update discount")
                }
                else if(promotionExist && isRemove){
                    await removeDiscount({variables: {id:discount.id}})
                    console.log("del discount")
                }
            }
            createDiscountFuc()
            setIsUpdate("Success")
            loadProduct()
        } catch (e) {
            console.log(error, e.message)
            setIsUpdate("Fail")
        }
    }

    return (
        <div>
            <Response state={isUpdate} setState={setIsUpdate} />
            {product !== null && (
                <ProductForm title={`แก้ไขสินค้า`} product={product} discountPack={discountPack} image={image} 
                inputHandle={inputHandle} submitForm={submitForm} />
            )}
        </div>
    )
}

export default UpdateProduct