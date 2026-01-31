const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

// to check img validation do not aceecp file only accecpt img

function fileFilter(req, file, cb) {
    const allowtype = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowtype.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("only image files are allow"), false)
    }
} 


// fileSize = set limit for img only 5 mb

const upload = multer({
    storage: storage, fileFilter, limits: {
        fileSize: 5 * 1024 * 1024, 
    }
})
module.exports = upload;