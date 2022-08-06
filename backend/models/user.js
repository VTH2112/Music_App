const { db } = require("./");
const findUserByUserName = async (username) => {
    return await db.users.findOne({ username: username });
};
const insertUser = async (username,password, email) => {
    return await db.users.insertOne({
        username: username,
        password: password,
        email: email
    });
}
module.exports = { findUserByUserName, insertUser };