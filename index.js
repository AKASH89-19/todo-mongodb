const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const {authmiddleware} = require("./middleware") 
const {usermodel,TodoModle} = require("./modles")
app.get("/",function(req,res)
{

})
app.post("/signup",async function(req,res)
{
  const username = req.body.username
  const password = req.body.password
  const userexist = await usermodel.findOne({
    username: username,
    password: password
  })
  if(userexist)
  {
    res.status(403).json({
      message : "user already exists"
    })
  }
  return
  const newuser = await usermodel.create({
    username: username,
    password: password
  })
  res.json({
    id: newuser._id
  })

})
app.post("/signin",async function(req,res){
 const username = req.body.username
 const password = req.body.password
 const userexist = await usermodel.findOne({
  username: username,
  password: password
 })
 if(!userexist)
 {
  res.status(403).json({
    message:"invalid credential"
  })
 }
 const token =jwt.sign({
  userid: userexist.id
 },"secreat123")
 res.json(
  {
    token: token
  }
 )
})
app.post("/todo",authmiddleware,function(req,res){
const userid = req.userid
})
app.delete("/deletetodo",authmiddleware,function(req,res)
{
    
})
app.post("/todos",authmiddleware,function (req,res){
const userid = req.userid
}) 







app.listen((3000),function(){
  console.log('Server is running on http://localhost:3000')
})
