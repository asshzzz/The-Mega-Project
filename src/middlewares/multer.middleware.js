import multer from "multer"
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // file multer ke paas hi hota hai
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname) // cb = callback function jo multer internally deta hai 
  }
})

export const upload = multer({ 
    storage,
 })