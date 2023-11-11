const express = require('express')
const app = express()
require('./model/db')
const cors = require('cors')
const router = require('./routes/user-routes')

//Middleware
app.use(express.json())
app.use(cors())
app.use('/',router)

app.listen(5000,()=>{
    console.log("server is running on port 5000")
})