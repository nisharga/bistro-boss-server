import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else {
      // eslint-disable-next-line no-console
      console.log('Only jpg, png allow')
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
})

// eslint-disable-next-line no-undef
module.exports = upload
