const express = require("express")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
require("dotenv").config()

const app = express()

const PORT = process.env.PORT || 4000



// database connection

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

//  Default Route

app.get("/", (req, res) => {
    res.status(201)
    res.json({ msg: "welcome to my api" })
})
// user route

app.use("/api/user" , require("./routes/userRoutes"))
 

// document routes

app.use("/api/document" , require("./routes/documentRoutes"))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})