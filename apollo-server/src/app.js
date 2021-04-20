import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import cors from 'cors'

//import './mongoose-connect'
import mongoose from 'mongoose'
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')

import schema from './graphql'
import { imageModel } from './models'

mongoose.Promise = Promise
mongoose.connect(
  'mongodb://localhost:27017',
  {
    dbName: 'fswd-project',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)

const conn = mongoose.connection
let gfs
conn.once('open', () => {
  //initialize our stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('imageUpload')
})

const path = '/graphql'
const server = new ApolloServer({
  schema,
  // introspection: true,
  playground: true,
  context: ({ req }) => ({ user: req.user }),
})

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  path,
  jwt({
    secret: process.env.SECRET ?? 'default-secret',
    algorithms: ['HS256'],
    getToken: (req) => {
      if (req?.cookies?.token) {
        return req?.cookies?.token
      }
      if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        return req?.headers?.authorization?.split(' ')?.[1]
      }
      if (req?.query?.token) {
        return req?.query?.token
      }
      return null
    },
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    res.status(200).json({
      errors: [
        {
          message: err.message,
        },
      ],
    })
  },
)

var fs = require('fs');
const multer  = require('multer')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

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

const upload = multer({ storage: storage });

app.post('/image', upload.single('image'), (req, res, next) => {
  res.send(req.file)
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
      //check if files exist
      if (!files || files.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
      // files exist
      return res.json(files)
  })
})

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      //check if files exist
      if (!file || file.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
      //check if image
      if (file.contentType === 'image/jpeg' || file.contentType === "image/png") {
          //read output to browser
          const readStream = gfs.createReadStream(file.filename)
          readStream.pipe(res)
      } else {
          res.status(404).json({
              err: "Not an image"
          })
      }
  })
})

server.applyMiddleware({ app, path, cors: { origin: 'http://localhost:3000', credentials: true } })

app.listen({ port: 3001 }, () => {
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
})