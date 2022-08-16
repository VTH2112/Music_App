const express = require("express");
const authRouter = require("./auth");
const studentRouter = require("./student");
const uploadRouter = require("./upload");
const router = express.Router();
const songRouter = require('./song')
const playListRouter = require('./playlist')

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/upload", uploadRouter);
router.use("/song", songRouter);
router.use("/playlist", playListRouter);
module.exports = router;