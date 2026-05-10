const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const {authmiddleware} = require("./middleware") 
app.get("/",function(req,res)
{

})
app.post("/signup",function(req,res)
{

})
app.post("/signin",function(req,res){

})
app.post("/todo",authmiddleware,function(req,res){
const userid = req.userid
})
app.post("/todos",authmiddleware,function (req,res){
const userid = req.userid
}) 







app.listen((3000),function(){
  console.log('Server is running on http://localhost:3000')
})
