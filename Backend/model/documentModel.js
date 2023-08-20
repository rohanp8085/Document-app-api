const mongoose = require("mongoose")


const documentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "please add title"]
    },
    description: {
        type: String,
        required: [true, "please add discription"]
    }
    
   



},
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Document", documentSchema)