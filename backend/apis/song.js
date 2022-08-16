const express = require("express");
const multer = require("multer");
const router = express.Router();
const SongCtrl = require("../controllers/SongController")
const jwtMdw = require("../Middleware/jwt")
const path = require('path');
//const uploadMdw = multer({dest:path.join(__dirname, "../static")});
const stograte = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "audio") {
            callback(null, './static/audio/')
        }
        else if (file.fieldname === "img") {
            callback(null, './static/img/');
        }
    },
    filename:(req,file,callback)=>{
        if (file.fieldname === "audio") {
            callback(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
        else if (file.fieldname === "img") {
            callback(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
    }
})
const upload = multer({ storage: stograte });


router.get("/", async (req, res) => { 
    const songs = await SongCtrl.getAllSong();
    return res.json(songs)

})
router.get("/:id", (req, res) => { })
router.post("/", upload.fields([{
    name: 'audio', maxCount: 1
  }, {
    name: 'img', maxCount: 1
  }]) , async(req, res) => {
    console.log(req.files.img[0], req.files.audio[0])
    const audioFile = req.files.audio[0];
    const imgfile =     req.files.img[0];

    console.log(req.files.img[0], req.files.audio[0])
    const song = {title: req.body.title, 
                artist: req.body.artist, 
                artwork : 'img/' + imgfile.filename,
                url :   'audio/' +audioFile.filename,
                duration: req.body.duration,
                owner: req.body.owner,
                type: req.body.type
            }
    console.log(song);        
    await SongCtrl.insertSong(song);
    return res.json({
        message: "insert sucessfully"
    })
})
router.put("/:id", (req, res) => { })
router.delete("/:id", (req, res) => { })
module.exports = router;