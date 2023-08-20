const AsynceHandler = require("express-async-handler")
const User = require("../model/userModel")
const Document = require("../model/documentModel")
// const { Error } = require("mongoose")

const getDocuments = AsynceHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(400)
        throw new Error("User not found")
    }

    const Documents = await Document.find({ user: req.user.id })

    res.status(200).json(Documents)
}

)

const getDocument = AsynceHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const document = await Document.findById(req.params.id)

    if (!document) {
        res.status(404);
        throw new Error("Document not found")
    }
    if (document.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized")
    }
    res.status(200).json(document)
})


const createDocument = AsynceHandler(async (req, res) => {
    console.log(req.file)
    const { title, description } = req.body

    if (!title || !description) {
        res.status(401)
        throw new Error("please fill All details")
    }
     const user =  await User.findById(req.user.id)
   
     if(!user){
        res.status(401)
        throw new Error("user not found")
     }
     const document = await Document.create({
        user : req.user.id,
        title,
        description,
     })
     res.status(201).json(document)
})
const updateDocument = AsynceHandler(async (req, res) => {

    // const user = await User.findById(req.user.id)
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const document = await Document.findById(req.params.id)

    if (!document) {
        res.status(404);
        throw new Error("Document not found")
    }

    const updateddocument = await Document.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updateddocument)
}

)

const deleteDocument = AsynceHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const document = await Document.findById(req.params.id)

    if (!document) {
        res.status(404);
        throw new Error("Document not found")
    }
    if (document.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not Authorized")
    }
    await Document.findByIdAndDelete(req.params.id)
    res.status(200);
    res.json({ msg: "Document deleted" })
})

module.exports = { getDocuments, getDocument, createDocument, updateDocument, deleteDocument }