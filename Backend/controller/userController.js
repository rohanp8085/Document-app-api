
const asynceHandler = require("express-async-handler")
const User = require("../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { json } = require("express")
// const multer = require("multer")
// const upload = multer({ dest: 'uploads/' })

const registerUser = asynceHandler(async (req, res) => {

    // const proflileImage = req.file.path

    // console.log(proflileImage)

    const { name, email, password } = req.body

    if (!name || !email || !password ) {
        res.status(400)
        throw new Error("please includes all fields")
    }
    const findExistingUser = await User.findOne({ email: email })
    //    find existing user
    if (findExistingUser) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    // hashpassword

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // create user

    const user = await User.create({
        // Image: proflileImage,
        name,
        email,
        password: hashedPassword,

    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            // image : proflileImage,
            name: user.name,
            email: user.email,
            password: user.password,
            token: genrateToken(user._id),
           
        })
    } else {
        res.status(400)
        throw new Error("Invailid User Data")
    }
    // res.send("User Registered")
}
)

const loginUser = asynceHandler(
    async (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400)
            throw new Error("please includes all fields")
        }
        //   find user

        const user = await User.findOne({ email })
        

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                // image : proflileImage = req.file.path,
                name: user.name,
                email: user.email,
                token: genrateToken(user._id),
                
            })
        } else {
            res.status(401);
            throw new Error("Invalid Credantials")
        }
    }
)

const genrateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}




const uploadphoto = async (req, res) => {
    console.log(req.file);
    res.send("opload")



}
module.exports = { registerUser, loginUser,  uploadphoto }