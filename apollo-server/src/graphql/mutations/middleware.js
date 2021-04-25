import { ProductModel, UserModel } from '../../models'

export const authCreateMiddleware = async (resolve, source, args, context, info) => {
    if (context?.user) {
        const newArgs = {
            ...args,
            record: {
            ...args.record,
            userId: context?.user._id
        }}

        return resolve(source, newArgs, context, info);
    }
    throw new Error('You must be authorized');
}

export const adminPermission = async (resolve, source, args, context, info) => {
    if (context?.user?.isAdmin) {
        return resolve(source, args, context, info)
    }
    throw new Error('You must be authorized');
}

export const productValid = async (resolve, source, args, context, info) => {
    const { title } = args.record
    const productByTitle = await ProductModel.findOne({ title })
    if (productByTitle){
        throw new Error('title is already taken')
    }
    else{
        return resolve(source, args, context, info)
    }
}

export const createUserValid = async (resolve, source, args, context, info) => {
    const { username } = args.record
    const userByUsername = await UserModel.findOne({ username })
    if (userByUsername){
        throw new Error('username is already taken')
    }
    else{
        return resolve(source, args, context, info)
    }
}

export default authCreateMiddleware