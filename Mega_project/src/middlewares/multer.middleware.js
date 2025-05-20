import multer from "multer"

// ye hume localfilepath degaa jo hum cloudinary ko denge
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage: storage })