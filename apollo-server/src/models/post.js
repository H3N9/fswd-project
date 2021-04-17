import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'
const enumPostType = {
  STATUS: 'Status',
  PHOTO: 'Photo',
  VIDEO: 'Video',
}
const PostSchema = new Schema({
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumPostType),
    index: true,
  },
  timestamp: { type: Date, default: Date.now },
  postById: { type: String, require: true, ref: 'User' },
})
const StatusPostSchema = new Schema({
  status: { type: String, require: true },
})
const PhotoPostSchema = new Schema({
  photoUrl: { type: String, require: true },
  caption: { type: String, default: null },
})
const VideoPostSchema = new Schema({
  videoUrl: { type: String, require: true },
  caption: { type: String, default: null },
})
PostSchema.set('discriminatorKey', DKey)

const discriminatorOptions = {
  inputType: {
    removeFields: ['timestamp'],
  },
}

export const PostModel = mongoose.model('Post', PostSchema)
export const StatusPostModel = PostModel.discriminator(enumPostType.STATUS, StatusPostSchema)
export const PhotoPostModel = PostModel.discriminator(enumPostType.PHOTO, PhotoPostSchema)
export const VideoPostModel = PostModel.discriminator(enumPostType.VIDEO, VideoPostSchema)

export const PostTC = composeWithMongooseDiscriminators(PostModel)
export const StatusPostTC = PostTC.discriminator(StatusPostModel, { name: enumPostType.STATUS, ...discriminatorOptions })
export const PhotoPostTC = PostTC.discriminator(PhotoPostModel, { name: enumPostType.PHOTO, ...discriminatorOptions })
export const VideoPostTC = PostTC.discriminator(VideoPostModel, { name: enumPostType.VIDEO, ...discriminatorOptions })

export default PostModel