import { schemaComposer } from 'graphql-compose'
import { UserInputError } from 'apollo-server-express'
import { UserTC, UserModel } from '../../models'
import { createUserValid } from './middleware'

export const createUser = UserTC.getResolver('createOne', [createUserValid])
//export const updateUserById = UserTC.getResolver('updateById')
export const removeUserById = UserTC.getResolver('removeById')

const updateUserInput = schemaComposer.createInputTC({
    name: 'updateUserInput',
    fields: {
        username: 'String',
        name: 'String',
        oldPassword: 'String',
        newPassword: 'String'
    }
})

export const updateProfile = schemaComposer.createResolver({
    name: 'updateProfile',
    args: {
        record: updateUserInput
    },
    type: UserTC,
    resolve: async ({ args, context }) => {
        if(context?.user){
            const userContext = context.user
            const { username, name, oldPassword, newPassword } = args.record
            const user = await UserModel.findOne({ _id: userContext._id })
            if (oldPassword !== '' && newPassword !== '' && newPassword !== null){
                const passwordValid = await user.verifyPassword(oldPassword)
                if (passwordValid){
                    user.password = newPassword
                    await user.save()
                }
                else{
                    throw new UserInputError('Incorrect password')
                }
            }
            const users = await UserModel.find({ username, _id: {$nin: [userContext._id]} })
            if (users.length !== 0){
                throw new Error('username is already taken')
            }
            user.username = username
            user.name = name
            await user.save()

            return user
        }
        throw new Error('You must be authorized');
    }
})