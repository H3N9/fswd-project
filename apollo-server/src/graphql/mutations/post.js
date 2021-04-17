import { PhotoPostTC, StatusPostTC, VideoPostTC } from '../../models'

export const createStatusPost = StatusPostTC.getResolver('createOne')
export const createPhotoPost = PhotoPostTC.getResolver('createOne')
export const createVideoPost = VideoPostTC.getResolver('createOne')