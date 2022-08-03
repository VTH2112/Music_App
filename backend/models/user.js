const { db } = require("./");
const findUserByUserName = async (username) => {
    return await db.users.findOne({ username: username });
};
const insertUser = async (username, password, per) => {
    return await db.users.insertOne({
        username: username,
        password: password,
        per: per
    });
}
module.exports = { findUserByUserName, insertUser };