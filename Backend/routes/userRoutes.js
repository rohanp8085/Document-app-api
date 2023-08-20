const express = require("express")
const { registerUser, loginUser, uploadphoto } = require("../controller/userController")
const { Protect } = require("../middleware/authMiddleware")
// const multer = require("multer")




const router = express.Router()


 
router.post("/register",  registerUser)
router.post("/login", loginUser)

// const storage = multer.diskStorage({
//     destination : (req , file , cb) => {
//         return cb(null , './uploads')
//     },
//     filename : (req , file , cb) =>{
//         return cb(null , `${Date.now()}-${file.originalname}`)
//     }
//  })

//  const upload  = multer({storage})

// const upload = multer({ dest: 'uploads/' })

router.post("/upload", uploadphoto)



module.exports = router