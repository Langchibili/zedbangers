const mongoose = require("mongoose");

//repost schema
const repostSchema = new mongoose.Schema({
          user_id: String,
					post_id: String,
					user_picture_xl: String,
					user_url: String,
					user_name: String,	
					originalPost: {
               post_thumnail: {type: String},
               post_url: {type: String},
               user_id: {type: String},
               user_url: {type: String},
               user_name: {type: String},
               user_picture_xl: {type: String}
							
					},
					timestamp: {
            type:Date,
            default:Date.now()
          }
});


// repost model
const repostModel = mongoose.model("reposts",repostSchema,"reposts");
                
module.exports.reposts = {
                 /* GET ALL REPOSTS FROM DATABASE*/
                  getReposts: async function(fields=null,limit=100){
                      return await repostModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE REPOSTS FROM DATABASE*/
                  getRepost: async function(repostId,fields=null){
                    const filterObject = { _id: repostId };
                    return await repostModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A REPOST TO DATABASE AND RETURN SAVED OBJECT*/
                  addRepost: async function(repostObject){
                    const newRepost = new repostModel(repostObject);
                    return await newRepost.save();
                },
                /* UPDATE A REPOST INFO IN DATABASE*/
                  updateRepost: async function(repostId, repostUpdateObject){
                    const filterObject = { _id: repostId };
                    const response = await repostModel.updateOne(filterObject, repostUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A REPOST FROM DATABASE*/
                  deleteRepost: async function(repostId){
                    const filterObject = { _id: repostId };
                   //delete repost
                   repostModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}