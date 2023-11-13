const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async()=>{
  await mongoose
    .connect(
      `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.hmmxemp.mongodb.net/usersAuth?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
}

connectDB()
exports.connectDB = connectDB

//4987DFkWL2UGY5OH - pass