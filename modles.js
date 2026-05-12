require("dotenv").config()
const mongoose = require("mongoose")
// users schema 
//todos schema for mongoose
mongoose.connect(process.env.MONGO_URI)
const usersschema = new mongoose.Schema({
    username : String,
    password : String
})
const todoschema = new mongoose.Schema({
      title : String,
      description : String,
      usersID : mongoose.Types.ObjectId
})
const usermodel = mongoose.model("users",usersschema)
const TodoModle = mongoose.model("todo",todoschema)

module.exports={
    usermodel : usermodel,
    TodoModle : TodoModle
}