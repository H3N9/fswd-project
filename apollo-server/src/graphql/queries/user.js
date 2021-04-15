import { schemaComposer } from 'graphql-compose'
import { UserTC, UserModel } from '../../models'

export const userById = UserTC.getResolver('findById')
export const user = UserTC.getResolver('findOne')
export const users = UserTC.getResolver('findMany')

export const me = schemaComposer.createResolver({
    name: 'me',
    type: UserTC.getType(),
    resolve: async ({ context }) => {
      if (!context.user) {
        return null
      }
      const { _id } = context.user
      const user = await UserModel.findById(_id)
      return user
    },
})