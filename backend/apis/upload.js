const express = require("express");
const multer = require("multer");
const extension = ".JPG"
const router = express.Router();
const path = require("path");
const {v4} = require("uuid")


const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null,path.join(__dirname, "../static"))
    },
    filename: (req, file, cb)=> {
        const {mimetype} = file;
        let extension = "";
        if (mimetype === "image/jpeg") {
            extension = ".jpg";
        } 
        const time = new Date().toISOString();
        cb(null, v4()+ extension);
    },
});

const uploadMdw = multer({
    storage: storage
});


router.post("/", uploadMdw.single("file") ,(req, res)=>{
    res.send("/static/" + req.file.filename);
})
module.exports = router;