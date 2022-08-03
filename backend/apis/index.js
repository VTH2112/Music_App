const express = require("express");
const authRouter = require("./auth");
const studentRouter = require("./student");
const uploadRouter = require("./upload");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/upload", uploadRouter);
module.exports = router;