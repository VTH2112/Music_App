const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signIn = async(usename, password) => { 
    //1. Validation
    //2. get user by username
    //3. Check password
    const user = await userModel.findUserByUserName(usename);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    await checkPassword(user, password);
    console.log(user.username)
    return {user: user, token: generateJwt(user.username)};
};
const signUp = async (usename, password, per) => {
    //1. Validation
    //2. check username existed
    const user = await userModel.findUserByUserName(usename)
    if (user) {
        throw new Error("USER_EXISTED");
    }
    const hasdedpassword =  await hashPassword(password);

    await userModel.insertUser(usename, hasdedpassword, per);


};

const hashPassword = async (passowrd) => {
    const hashedPassword = await bcrypt.hash(passowrd, 10);
    return hashedPassword;
};


const checkPassword = async(user, password)=>{
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new Error("password is wrong");
    }
}

const generateJwt = (username) =>{
    const token = jwt.sign({username: username}, "JWT_SERECT",{})
    return token;
};

module.exports = { signIn, signUp };