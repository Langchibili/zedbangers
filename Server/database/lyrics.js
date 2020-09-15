const mongoose = require("mongoose");

//lyric schema
const lyricSchema = new mongoose.Schema({
		post_id: String,
		status: String,
    author_id:String,
    parent_user_type: String,
    parent_post_type: String,
		user_picture_xl: String,
	  user_url: String,
    user_name: String,
    edited: Boolean,	
		description: {
			post_url: {type: String},
			post_thumbnail:{type: String},
			body:{type: String}
		},
		timestamp: {
      type:Date,
      default:Date.now()
    }
});


// lyric model
const lyricModel = mongoose.model("lyrics",lyricSchema,"lyrics");
                
module.exports.lyrics = {
                 /* GET ALL LYRICS FROM DATABASE*/
                  getLyrics: async function(fields=null,limit=100){
                      return await lyricModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE LYRI FROM DATABASE*/
                  getLyric: async function(lyricId,fields=null){
                    const filterObject = { _id: lyricId };
                    return await lyricModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A LYRI TO DATABASE AND RETURN SAVED OBJECT*/
                  addLyric: async function(lyricObject){
                    const newLyric = new lyricModel(lyricObject);
                    return await newLyric.save();
                },
                /* UPDATE A LYRI INFO IN DATABASE*/
                  updateLyric: async function(lyricId, lyricUpdateObject){
                    const filterObject = { _id: lyricId };
                    const response = await lyricModel.updateOne(filterObject, lyricUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A LYRI FROM DATABASE*/
                  deleteLyric: async function(lyricId){
                    const filterObject = { _id: lyricId };
                   //delete lyric
                   lyricModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}