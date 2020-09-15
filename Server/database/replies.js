const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//reply schema
const replySchema = new mongoose.Schema({  
        user_id: String,
        post_id: String,
        comment_id: String,
        user_picture_xl: String,
        user_nice_name: String,
        user_url: String,
        user_name: String,	
          reply_body: {
          post_url: {type: String},
          body: {type: String},
          post_thumbnail: {type: String},
          reply_description:{type: String},
          media: {
            photo_url: {type: String},
            video_url: {type: String}

          }
        },
        numberOfreplies: Number,
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


// reply model
const replyModel = mongoose.model("replies",replySchema,"replies");
                
module.exports.replies = {
                 /* GET ALL REPLIES FROM DATABASE*/
                 getReplies: async function(commentId, fields=null, limit=100, sortObject={_id: -1}){
                  filterBy={comment_id: commentId}
                    return await replyModel.find(filterBy,fields,function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);

                },
                  /* GET ONE REPLIES FROM DATABASE*/
                  getReply: async function(replyId,fields=null){
                    const filterObject = { _id: replyId };
                    return await replyModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A REPLY TO DATABASE AND RETURN SAVED OBJECT*/
                  addReply: async function(replyObject){
                    const newReply = new replyModel(replyObject);
                    return await newReply.save();
                },
                /* UPDATE A REPLY INFO IN DATABASE*/
                  updateReply: async function(replyId, replyUpdateObject){
                    const filterObject = { _id: replyId };
                    const response = await replyModel.updateOne(filterObject, replyUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A REPLY FROM DATABASE*/
                  deleteReply: async function(replyId){
                    const filterObject = { _id: replyId };
                   //delete reply
                   replyModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}