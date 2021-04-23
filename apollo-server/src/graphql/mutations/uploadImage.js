import { schemaComposer } from 'graphql-compose'
import GridFsStorage from 'multer-gridfs-storage'
import { storeFile } from '../../mongoose-connect'

const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/fswd-project',
    file: (req, file) => {
        return new Promise(
            (resolve, reject) => {
              const fileInfo = {
                filename: file.originalname,
                bucketName: "imageUpload"
              }
              resolve(fileInfo)
            }
        )
    }
  })

const uploadImageInput = schemaComposer.createInputTC({
    name: 'uploadImageInput',
    fields: {
        file: 'Upload'
    }
})

export const uploadImage = schemaComposer.createResolver({
    name: 'uploadImage',
    args: {
        record: uploadImageInput
    },
    type: 'String',
    resolve: async ({ args, context }) => {
        //const { file } = args.record

        // console.log(file)
        //console.log(await file)
        //storage._handleFile(file)
        storage._handleFile
        //const fileId = await storeFile(file).then(result => result);

        return 'test'
    }
})