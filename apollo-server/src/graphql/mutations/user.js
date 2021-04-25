import { UserTC } from '../../models'
import { createUserValid } from './middleware'

export const createUser = UserTC.getResolver('createOne', [createUserValid])
export const updateUserById = UserTC.getResolver('updateById')
export const removeUserById = UserTC.getResolver('removeById')