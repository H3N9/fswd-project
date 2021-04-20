import mongoose from 'mongoose'

const { Schema } = mongoose

const imageSchema = new Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

export const imageModel = mongoose.model('Image', imageSchema)