const express = require('express');
const router = express.Router();
const multer  = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const mongoose = require('./mongoose-connect')

const conn = mongoose.connection
let gfs
conn.once('open', () => {
  //initialize our stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('imageUpload')
})

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/fswd-project',
  file: (req, file) => {
      return new Promise(
          (resolve, reject) => {
            const fileInfo = {
              filename: Date.now()+".png",
              bucketName: "imageUpload"
            }
            resolve(fileInfo)
          }
      )
  }
})

const upload = multer({ storage: storage });

router.post('/', upload.single('image'),  (req, res, next) =>{
    res.send(req.file)
})

router.get('/', (req, res) => {
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
  
router.get('/:filename', (req, res) => {
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

module.exports = router