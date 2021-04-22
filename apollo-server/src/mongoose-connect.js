import mongoose from 'mongoose'

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

module.exports = mongoose