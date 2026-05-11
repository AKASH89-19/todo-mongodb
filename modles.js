const mongoose = require("mongoose")
// users schema 
//todos schema for mongoose
const usersschema = new mongoose.Schema({
    username : String,
    password : String
})
const todoschema = new mongoose.Schema({
      title : String,
      discription : String,
      usersID : mongoose.Types.ObjectId
})
const usermodel = mongoose.model("users",usersschema)
const TodoModle = mongoose.model("todo",todoschema)

module.exports={
    usermodel : usermodel,
    TodoModle : TodoModle
}