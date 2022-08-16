const express = require("express");
const multer = require("multer");
const router = express.Router();
const playlistCtrl = require("../controllers/playlist")
const jwtMdw = require("../Middleware/jwt")


// router.get("/", async (req, res) => { 
//     console.log("get all")
//     console.log(req.query.id)
//     const playlists = await playlistCtrl.getAllPlayList();
//     return res.json(playlists)

// })
router.get("/:id", async(req, res) => { 
    console.log("get by id")
    console.log(req.params.id)
    const listsong = await playlistCtrl.getPlayListByID(req.params.id);
    return res.json(listsong)
})

router.put("/:id", (req, res) => { })
router.delete("/:id", (req, res) => { })
module.exports = router;