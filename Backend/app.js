const express = require('express')
const app = express()
require('./model/db')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const router = require('./routes/user-routes')
require('dotenv').config()

//Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser())
app.use(express.json())
app.use('/',router)

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})