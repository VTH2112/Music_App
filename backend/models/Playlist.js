const {db} = require("./")
const { ObjectId } = require("mongodb");

const getAllPlayList = async() =>{
    return await db.playlists.find({}).toArray();
}
const getPlayListByID = async(id) =>{
    const playlist = await db.playlists.
    aggregate([
        {
          '$match': {
            '_id': new ObjectId(id)
          }
        }, {
          '$unwind': {
            'path': '$songList'
          }
        }, {
          '$lookup': {
            'from': 'songs', 
            'localField': 'songList', 
            'foreignField': '_id', 
            'as': 'song'
          }
        }, {
          '$unwind': {
            'path': '$song'
          }
        }, {
          '$group': {
            '_id': '$_id', 
            'name': {
              '$first': '$name'
            }, 
            'songList': {
              '$push': '$song'
            }
          }
        }
      ]);
    return playlist.toArray();;
}
// const insertSong = async(song) =>{
//     return await db.songs.insertOne({title: song.title, 
//         artist: song.artist, 
//         artwork : song.artwork,
//         url : song.url,
//         duration: song.duration,
//         owner: song.owner,
//         type: song.type
//     });
// }



module.exports = {getAllPlayList, getPlayListByID}