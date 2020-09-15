const mongoose = require("mongoose");

//share schema
const shareSchema = new mongoose.Schema({});


// share model
const shareModel = mongoose.model("shares",shareSchema,"shares");
                
module.exports.shares = {
                 /* GET ALL SHARES FROM DATABASE*/
                  getShares: async function(fields=null,limit=100){
                      return await shareModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE SHARE FROM DATABASE*/
                  getShare: async function(shareId,fields=null){
                    const filterObject = { _id: shareId };
                    return await shareModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A SHARE TO DATABASE AND RETURN SAVED OBJECT*/
                  addShare: async function(shareObject){
                    const newShare = new shareModel(shareObject);
                    return await newShare.save();
                },
                /* UPDATE A SHARE INFO IN DATABASE*/
                  updateShare: async function(shareId, shareUpdateObject){
                    const filterObject = { _id: shareId };
                    const response = await shareModel.updateOne(filterObject, shareUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A SHARE FROM DATABASE*/
                  deleteShare: async function(shareId){
                    const filterObject = { _id: shareId };
                   //delete share
                   shareModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}