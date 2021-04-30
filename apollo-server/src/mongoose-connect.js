import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.Promise = Promise
mongoose.connect(
  process.env.DB_HOST,
  //'mongodb://localhost:27017',
  {
    //dbName: 'fswd-project',
    //promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)

module.exports = mongoose