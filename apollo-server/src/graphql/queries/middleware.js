export const authQueryMiddleware = async (resolve, source, args, context, info) =>{
    console.log({ source, info })
    if (context?.user) {
        const newArgs = {...args, filter: {
            userId: context?.user._id
        }}

        return resolve(source, newArgs, context, info);
    }
    throw new Error('You must be authorized');
}

export default authQueryMiddleware