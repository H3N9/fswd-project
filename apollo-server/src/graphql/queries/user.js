import { UserTC } from '../../models'

export const userById = UserTC.getResolver('findById')
export const user = UserTC.getResolver('findOne')
export const users = UserTC.getResolver('findMany')