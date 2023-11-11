const mongoose = require('mongoose')

const connectDB = async()=>{
  await mongoose
    .connect(
      "mongodb+srv://admin:4987DFkWL2UGY5OH@cluster0.hmmxemp.mongodb.net/usersAuth?retryWrites=true&w=majority"
    )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
}

connectDB()
exports.connectDB = connectDB

//4987DFkWL2UGY5OH - pass