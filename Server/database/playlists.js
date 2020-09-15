const mongoose = require("mongoose");

//playlist schema
const playlistSchema = new mongoose.Schema({
                user_id: String,
                playlist_type: String,
								user_picture_xl: String,
								user_url: String,
								user_name: String,	
								tracks:[{
                    post_url: { type: String },
                    duration:{ type: Number },
                    meme_type: { type: String },
                    full_track_path : { type: String },
                    track_snippet_path: { type: String },
                    track_thumbnail: { type: String }
                  }
                ],
                videos: [{
                  post_url: { type: String },
                  duration:{ type: Number },
                  meme_type: { type: String },
                  full_video_path : { type: String },
                  video_snippet_path: { type: String },
                  video_thumbnail: { type: String }
                }],
								timestamp: {
                        type:Date,
                        default: Date.now()
                }
});


// playlist model
const playlistModel = mongoose.model("playlists",playlistSchema,"playlists");
                
module.exports.playlists = {
                 /* GET ALL PLAYLISTS FROM DATABASE*/
                  getPlaylists: async function(fields=null,limit=100){
                      return await playlistModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE PLAYLISTS FROM DATABASE*/
                  getPlaylist: async function(playlistId,fields=null){
                    const filterObject = { _id: playlistId };
                    return await playlistModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A PLAYLIST TO DATABASE AND RETURN SAVED OBJECT*/
                  addPlaylist: async function(playlistObject){
                    const newPlaylist = new playlistModel(playlistObject);
                    return await newPlaylist.save();
                },
                /* UPDATE A PLAYLIST INFO IN DATABASE*/
                  updatePlaylist: async function(playlistId, playlistUpdateObject){
                    const filterObject = { _id: playlistId };
                    const response = await playlistModel.updateOne(filterObject, playlistUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A PLAYLIST FROM DATABASE*/
                  deletePlaylist: async function(playlistId){
                    const filterObject = { _id: playlistId };
                   //delete playlist
                   playlistModel.deleteOne(filterObject, function (err) { if (err) { throw err } return ; } );

                } 
}