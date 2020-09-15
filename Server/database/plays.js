const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//play schema
const playSchema = new mongoose.Schema({
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


// play model
const playModel = mongoose.model("plays",playSchema,"plays");
                
module.exports.plays = {
                 /* GET ALL PLAYS FROM DATABASE*/
                 getPlays: async function(fields="",limit=null,arrayOfIds=null,sortObject={_id: -1}){
                  if(!arrayOfIds){
                  return await playModel.find({},fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }
                  else{
                      return await playModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }

              },
              /* GET ALL PLAYS FROM DATABASE*/
                getPlaysByUserIds: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                      return await playModel.find({ userId : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                },
                  /* GET ONE PLAY FROM DATABASE*/
                  getPlay: async function(playId,fields=null){
                    const filterObject = { _id: playId };
                    return await playModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A PLAY TO DATABASE AND RETURN SAVED OBJECT*/
                  addPlay: async function(playObject){
                    const newPlay = new playModel(playObject);
                    return await newPlay.save();
                },
                /* UPDATE A PLAY INFO IN DATABASE*/
                  updatePlay: async function(playId, playUpdateObject){
                    const filterObject = { _id: playId };
                    const response = await playModel.updateOne(filterObject, playUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A PLAY FROM DATABASE*/
                  deletePlay: async function(playId){
                    const filterObject = { _id: playId };
                   //delete play
                   playModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}