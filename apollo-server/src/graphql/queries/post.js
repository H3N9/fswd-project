import { PostTC } from '../../models'

export const postById = PostTC.getResolver('findById')
export const posts = PostTC.getResolver('findMany')