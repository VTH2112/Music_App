const jwt = require("jsonwebtoken");
const userM = require("../models/user")
const jwtMdw = async (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    try{
        const decoded  =  jwt.verify(token, "JWT_SERECT");
        const user = await userM.findUserByUserName(decoded.username);
        req.user = user;
        console.log(decoded)
        next()
    }catch(err){

    }

};
module.exports = jwtMdw;