import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import './mongoose-connect'

import schema from './graphql'

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
      console.log(req?.cookies?.token)
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

app.use('/image', require('./image'))

server.applyMiddleware({ app, path, cors: { origin: 'http://localhost:3000', credentials: true } })

app.listen({ port: 3001 }, () => {
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
})