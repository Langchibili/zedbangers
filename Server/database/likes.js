const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//like schema
const likeSchema = new mongoose.Schema({
    user_id: String,
    post_id: String,
    other_user_id: String,
    type: String,
    length_streamed: Number,
    user_picture_xl: String,
    user_url: String,
    user_name: String,	
    body: {
      post_url: String,
      post_thumbnail:String,
    },
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
    },
});


// like model
const likeModel = mongoose.model("likes",likeSchema,"likes");
                
module.exports.likes = {
                    getLikes: async function(fields="",limit=null,arrayOfIds=null,sortObject={_id: -1}){
                        if(!arrayOfIds){
                        return await likeModel.find({},fields,function (err, docs) {
                            if (err){
                                throw err;
                            }
                            return docs;
                        }).sort(sortObject).limit(limit);
                        }
                        else{
                            return await likeModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                            if (err){
                                throw err;
                            }
                            return docs;
                        }).sort(sortObject).limit(limit);
                        }

                    },
                 /* GET ALL PLAYS FROM DATABASE*/
                   getLikesByUserIds: async function(fields=null,limit=null,arrayOfIds=null){
                        return await likeModel.find({ userId : { $in : arrayOfIds } },fields,function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                    }).sort(sortObject).limit(limit);
                  },
                  /* GET ONE PLAY FROM DATABASE*/
                  getLike: async function(likeId,fields=null){
                    const filterObject = { _id: likeId };
                    return await likeModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A PLAY TO DATABASE AND RETURN SAVED OBJECT*/
                  addLike: async function(likeObject){
                    const newLike = new likeModel(likeObject);
                    return await newLike.save();
                },
                /* UPDATE A PLAY INFO IN DATABASE*/
                  updateLike: async function(likeId, likeUpdateObject){
                    const filterObject = { _id: likeId };
                    const response = await likeModel.updateOne(filterObject, likeUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A PLAY FROM DATABASE*/
                  deleteLike: async function(likeId){
                    const filterObject = { _id: likeId };
                   //delete like
                   likeModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}