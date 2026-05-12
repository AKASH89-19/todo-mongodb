const jwt = require("jsonwebtoken")
const JWT_SECRET = "secreat123"

function authmiddleware(req,res,next){
    const token = req.headers.token 
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode) {
            req.userid = decode.userid
            next(); 
        } else {
            res.status(403).json({
                message : "token incorrect"
            })
        }
    } catch (e) {
        res.status(403).json({
            message : "Invalid or expired token"
        })
    }
}
module.exports = {
    authmiddleware: authmiddleware,
    JWT_SECRET: JWT_SECRET
}
