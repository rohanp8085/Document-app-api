const asynceHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")


const Protect = asynceHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token in headers
            token = req.headers.authorization.split(" ")[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // find user with token 
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error("Not Authorized")
        }

    } else {
        res.status(400)
        throw new Error("Not Authorized")
    }
})

module.exports = { Protect }