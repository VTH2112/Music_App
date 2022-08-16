const {db} = require("./")

const getSongs = async() =>{
    return await db.songs.find({}).toArray();
}
const insertSong = async(song) =>{
    return await db.songs.insertOne({title: song.title, 
        artist: song.artist, 
        artwork : song.artwork,
        url : song.url,
        duration: song.duration,
        owner: song.owner,
        type: song.type
    });
}
module.exports = {getSongs, insertSong}