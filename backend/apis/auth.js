
const express = require("express");
const authCtrl = require("../controllers/AuthController")
const router = express.Router();
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
    const { username, password, per } = req.body;
    await authCtrl.signUp(username, password, per);
    res.json({
        message: "sign up sucessfully"
    })


});
module.exports = router;
