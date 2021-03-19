const mongoose = require("mongoose");
const date =  require('date-and-time');
const api = require("../utilities/constants/api");
const docApiConcatinator = require("../functions").docApiConcatinator; // adds current api to uris
const now = new Date();

//playlist schema
const playlistSchema = new mongoose.Schema({
                playlistName: String,
                userId: String,
                playlist_type: String,
								user_picture_xl: String,
								user_url: String,
                userName: String,	
                userNiceName: String,
                postIds: [String],
                counts: {
                  plays: {
                              type: Number,
                              default: 0
                            },
                  downloads: {
                              type: Number,
                              default: 0
                            } ,
                  likes: {
                              type: Number,
                              default: 0
                            },
                          unique_plays: {
                              type: Number,
                              default: 0
                            },
                          unique_downloads: {
                          type: Number,
                          default: 0
                          } ,
                  unique_likes: {
                              type: Number,
                              default: 0
                            },
                  shares: {
                              type: Number,
                              default: 0
                            },
                          views: {
                              type: Number,
                              default: 0
                            },
                          unique_views: {
                          type: Number,
                          default: 0
                          },
                  totalcounts: {
                              type: Number,
                              default: 0
                            },
                          reposts: {
                              type: Number,
                              default: 0
                            },
                          comments: {
                              type: Number,
                              default: 0
                            },
                          replies: {
                              type: Number,
                              default: 0
                            },
                          commentsAndReplies: {
                              type: Number,
                              default: 0
                            }
                },
                thumbnail:{
                  size:  { type: Number },
                  user_id: { type: String },
                  cover: { type: String, default : "/files/images/blankthumbnail-full-width.jpg" },
                  medium: { type: String, default : "/files/images/blankthumbnail-mid-width.png" },
                  thumbnail: { type: String, default : "/files/images/blankthumbnail-thumb-width.png" },
                  small: { type: String, default : "/files/images/blankthumbnail-small-width.png"},
                  cover_big: { type: String },
                  cover_xl: { type: String },
                  type: { type: String },
                  size: Number
                },
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
								date:{
                  uploadedDate: {
                              type: String,
                              default: date.format(now, 'ddd, MMM DD YYYY')
                          },
                          uploadedTime: {
                              type: String,
                              default: date.format(now, 'hh:mm:ss A') 
                          },
                          date: {
                              type: String,
                              default: Date.now()
                          },
                  revisions: []
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
                getPlaylistsByUserId: async function(userId=null,fields=null,limit=null,sortObject={_id: -1}){
                  return await docApiConcatinator(api, null, await playlistModel.find({ userId :userId},fields,function (err, docs) {
                    if (err){
                        throw err;
                    }
                    return docs;
                 }).sort(sortObject={_id: -1}).limit(limit));
               },
               getPlaylistsByUserIds: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                return await docApiConcatinator(api, null, await playlistModel.find({ userId : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                   }).sort(sortObject={_id: -1}).limit(limit));
              },
              getPlaylistsByTypeAndUserIds: async function(fields=null,limit=null,arrayOfIds=null,post_type="music",sortObject={_id: -1}){
                return await docApiConcatinator(api, null, await playlistModel.find({ userId : { $in : arrayOfIds }, post_type: post_type },fields,function (err, docs) {
                  if (err){
                      throw err;
                  }
                  return docs;
               }).sort(sortObject={_id: -1}).limit(limit));
              },
              getPlaylistByPostIds: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                return await docApiConcatinator(api, null, await playlistModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                   }).sort(sortObject={_id: -1}).limit(limit));
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