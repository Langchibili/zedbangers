const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//comment schema
const commentSchema = new mongoose.Schema({
      comment_type: {
        type: String,
        default: "comment"
      },
      comment_id: String,
			user_id: String,
      post_id: String,
      user_nice_name: String,
			user_picture_xl: String,
			user_url: String,
			user_name: String,	
			comment_body: {
				post_url: {type: String},
				post_thumbnail:{type: String},
				comment_description:{type: String},
				body: {type: String},
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


// user model
const commentModel = mongoose.model("comments",commentSchema,"comments");
                
module.exports.comments = {
                 /* GET ALL COMMENTS FROM DATABASE*/
                  getComments: async function(postId, fields=null, limit=100, sortObject={_id: -1}){
                    filterBy={post_id: postId}
                      return await commentModel.find(filterBy,fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).sort(sortObject).limit(limit);

                  },
                  /* GET ONE COMMENT FROM DATABASE*/
                  getComment: async function(commentId, filterBy={}, fields=null){
                    const filterObject = { _id: commentId, ...filterBy};
                    return await commentModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A COMMENT TO DATABASE AND RETURN SAVED OBJECT*/
                  addComment: async function(commentObject){
                    const newComment = new commentModel(commentObject);
                    return await newComment.save();
                },
                /* UPDATE A COMMENT INFO IN DATABASE*/
                  updateComment: async function(commentId, commentUpdateObject){
                    const filterObject = { _id: commentId };
                    const response = await commentModel.updateOne(filterObject, commentUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A COMMENT FROM DATABASE*/
                  deleteComment: async function(commentId){
                    const filterObject = { _id: commentId };
                   //delete user
                   commentModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}