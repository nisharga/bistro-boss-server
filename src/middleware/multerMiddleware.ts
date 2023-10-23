import multer from 'multer'

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads') // Define the folder where uploaded files will be stored
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(
      null,
      file.fieldname + '-' + uniqueSuffix + '-' + file.originalname,
    )
  },
})

const upload = multer({ storage })

export const uploadMiddleware = upload.single('image')
