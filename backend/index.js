const express = require("express");
const { connecttoDb } = require("./models")
const router = require("./apis");
const errorMdw = require("./Middleware/error");
const app = express();
app.use(express.json());
app.use(router);
app.use("/static", express.static("static"));
app.use(errorMdw);
app.listen(3000, () => {
    console.log("app is running at 3000");
    connecttoDb();
});
