const express = require("express");
const router = express.Router();
const StudentCtrl = require("../controllers/StudentControler")
const jwtMdw = require("../Middleware/jwt")
const multer = require('multer')
const parth = require("path")

router.get("/",jwtMdw, async (req, res) => { 
    const students = await StudentCtrl.getAllStudents(req.user);
    return res.json(students)

})
router.get("/:id", (req, res) => { })

router.post("/", async(req, res) => {
    const user = {name: req.body.name, age: req.body.age}
    await StudentCtrl.insertStudent(user);
    return res.json({
        message: "sign up sucessfully"
    })
})
router.put("/:id", (req, res) => { })
router.delete("/:id", (req, res) => { })
module.exports = router;
