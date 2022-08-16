const PlaylistModel = require("../models/Playlist")
const getAllPlayList = async() =>{
    // checkPermisionAdmin(user);
    return await PlaylistModel.getAllPlayList();
}
const getPlayListByID= async(id) =>{
    console.log(id)
    return await PlaylistModel.getPlayListByID(id);
}

const insertPlaylist = async(id) =>{

}

const checkPermisionAdmin = (user) => {
    // if (!user.per){
    //     throw new Error('PERMISSION_DENIED');
    // }
    return true;
}
module.exports = {getAllPlayList, getPlayListByID, insertPlaylist}