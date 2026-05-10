const jwt = require("jsonwebtoken")
function authmiddleware(req,res,next){
const token = req.headers.token 
const decode = jwt.verify(token,"todo123")
const userid = parseInt(decode.userid)
if(userid)
{
   userid : userid;
    next();
}
else
{
    res.status(403).json({
        message : "token incorrect"
    })
    return;
}
}
module.exports = {
    authmiddleware: authmiddleware
}
