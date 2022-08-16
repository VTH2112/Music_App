
const express = require("express");
const authCtrl = require("../controllers/AuthController");
const jwtMdw = require("../Middleware/jwt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signin", async (req, res, next) => { 
    try {
    const { username, password } = req.body;
    const user = await authCtrl.signIn(username, password);
    res.json(user);
    }catch(err){
        next(err)
    }
})
router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;
    await authCtrl.signUp(username, password, email);
    res.json({
        message: "sign up sucessfully"
    })
});

router.get("/me", async (req, res) => {
    const token = req.headers.authorization.split[" "][1];
    jwt.verify(token, "JWT_SERECT",(err, decoded)=>{
        if (!err) {
            res.json({username: decoded.username})
        } else {
            res.status(401).send("Invalid token")
        }

    })

});
module.exports = router;
