const mongoose = require("mongoose");

//album schema
const albumSchema = new mongoose.Schema({
            categorNames: [],
			playlistsIds:[],
			genreNames: [],
			userId: String,
			type: String,
			album_type: String,
			status:String,
			title:String,
			title_short: String,
			full_title: String,
			description: String,
			short_description: String,
			artist: {
                artistId: String,
                artistName: String,
                linkToArtistPage: String,
                picture_xl: String
			},
			featuredArtists: [{
                artistid: String,
                artistName: String,
                picture_xl: String,
                linkToArtistPage: String,
			}],
			uploader:{
                albumid: String,
                albumname: String,
                picture_xl: String,
                linkToUploaderPage: String
            },
            author: {
                albumid: String,
                albumname: String,
                picture_xl: String,
                linkToUploaderPage: String
                
            },
			explicit:Boolean,
			isSingle:Boolean,
			isofficial: Boolean,
			isVerifiedUploader: Boolean,
			copyrightText: String,
			ediited:{
				status:{
                    type: Boolean,
                    default: false
                },
				editCount: {
                    type: Number,
                    default: 0
                }
			},
			previewed:{
                status:{
                    type: Boolean,
                    default: false
                },
                previewCount: {
                    type: Number,
                    default: 0
                }
			},
			album: {
			albumName: String,
			albumurl: String,
                externalUrl: {
                    link:String
                }
			},
			thumnail:{
                    cover: { type: String },
                    cover_small: { type: String },
                    cover_medium: { type: String },
                    cover_big: { type: String },
                    cover_xl: { type: String },
                    type: { type: String },
                    size: Number
                },					
            track:{
                album_url: { type: String },
                duration:{ type: Number },
                meme_type: { type: String },
                full_track_path : { type: String },
                track_snippet_path: { type: String },
                track_thumbnail: { type: String },
                size: Number
                },
            video: {
                album_url: { type: String },
                duration:{ type: Number },
                meme_type: { type: String },
                full_video_path : { type: String },
                video_snippet_path: { type: String },
                video_thumbnail: { type: String },
                size: Number
            },
            atttachment: {
                album_url: { type: String },
                album_thumnail: { type: String },
                size: Number,
                type: String
            },
            story:{
                  type: String,
                  path: String,
                  duration: Number,
                  backgroundTheme: String,
                  textColor: String,
                  views: {
                      type:Number,
                      default: 0
                  }
            },
			categories: [],
			genres: [],
			playlists:[],
			counts: {
				plays: Number,
				downloads: Number,
				likes: Number,
				shares: Number,
				pageViews: Number,
				totalcounts: Number,
				realbums: Number
			},
			chatrank: {
				thisWeek: Number,
				lastWeek: Number
			},
			date:{
				uploadedDate: {
                    type: Date,
                    default: Date.now()
                },
				timefromUploadDate: {
                    type: Date,
                    default: Date.now()
                },
				timefromEditDate: {
                    type: Date,
                    default: Date.now()
                },
				revisions: []
            },
            tags:[]
        });


// album model
const albumModel = mongoose.model("albums",albumSchema,"albums");                
module.exports.albums = {
                 /* GET ALL ALBUMS FROM DATABASE*/
                  getAlbums: async function(fields=null,limit=100){
                      return await albumModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE ALBUM FROM DATABASE*/
                  getAlbum: async function(albumId,fields=null){
                    const filterObject = { _id: albumId };
                    return await albumModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A ALBUM TO DATABASE AND RETURN SAVED OBJECT*/
                  addAlbum: async function(albumObject){
                    const newAlbum = new albumModel(albumObject);
                    return await newAlbum.save();
                },
                /* UPDATE A ALBUM INFO IN DATABASE*/
                  updateAlbum: async function(albumId, albumUpdateObject){
                    const filterObject = { _id: albumId };
                    const response = await albumModel.updateOne(filterObject, albumUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A ALBUM FROM DATABASE*/
                  deleteAlbum: async function(albumId){
                    const filterObject = { _id: albumId };
                   //delete album
                   albumModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                },
                getByQuery: function(){
                     return;
                } 
}