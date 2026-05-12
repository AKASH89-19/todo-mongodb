const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

const {authmiddleware, JWT_SECRET} = require("./middleware") 
const {usermodel, TodoModle} = require("./modles")

// Mongoose connection

app.get("/", function(req, res) {
    res.send("Todo API is running")
})

app.post("/signup", async function(req, res) {
    const username = req.body.username
    const password = req.body.password
    
    try {
        const userexist = await usermodel.findOne({
            username: username
        })
        
        if (userexist) {
            return res.status(403).json({
                message: "user already exists"
            })
        }
        
        const newuser = await usermodel.create({
            username: username,
            password: password
        })
        
        res.json({
            message: "User created successfully",
            id: newuser._id
        })
    } catch (e) {
        res.status(500).json({ message: "Error during signup" })
    }
})

app.post("/signin", async function(req, res) {
    const username = req.body.username
    const password = req.body.password
    
    const userexist = await usermodel.findOne({
        username: username,
        password: password
    })
    
    if (!userexist) {
        return res.status(403).json({
            message: "invalid credential"
        })
    }
    
    const token = jwt.sign({ userid: userexist._id }, process.env.JWT_SECRET)
    res.json({
        token: token
    })
})

// Create a todo
app.post("/todo", authmiddleware, async function(req, res) {
    const userid = req.userid
    const title = req.body.title
    const description = req.body.description
   console.log("req.body:", req.body)
    await TodoModle.create({
        title,
        description,
        usersID : userid
    })

    res.json({
        message: "Todo created successfully"
    })
})

// Delete a todo
app.delete("/deletetodo", authmiddleware, async function(req, res) {
    const userid = req.userid
    const todoId = req.body.todoId
    console.log("dfgs",req.body)
    const result = await TodoModle.deleteOne({
        _id: todoId,
        usersID: userid
    })

    if (result.deletedCount === 0) {
        return res.status(404).json({
            message: "Todo not found or not authorized"
        })
    }

    res.json({
        message: "Todo deleted successfully"
    })
})

// Get all todos for the user
app.post("/todos", authmiddleware, async function(req, res) {
    const userid = req.userid
    
    const todos = await TodoModle.find({
        usersID: userid
    })

    res.json({
        todos
    })
})

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000')
})
