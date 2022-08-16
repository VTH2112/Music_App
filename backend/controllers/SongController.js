const songModel = require("../models/Song")
const getAllSong = async() =>{
    // checkPermisionAdmin(user);
    return await songModel.getSongs();
}
const insertSong= async(song) =>{
    console.log(song)
    return await songModel.insertSong(song);
}

const checkPermisionAdmin = (user) => {
    // if (!user.per){
    //     throw new Error('PERMISSION_DENIED');
    // }
    return true;
}
module.exports = {getAllSong, insertSong}