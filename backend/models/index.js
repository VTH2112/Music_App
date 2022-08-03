const { MongoClient } = require("mongodb");
const db = {};

const connecttoDb = async () => {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    console.log("connect to db success")
    const database = client.db("mindx_rn_20");
    db.users = database.collection("users");
    db.students = database.collection("students");
    db.teachers = database.collection("teachers");

};
module.exports = { db, connecttoDb };