const mongoose = require("mongoose");

//message schema
const messageSchema = new mongoose.Schema({});


// message model
const messageModel = mongoose.model("messages",messageSchema,"messages");
                
module.exports.messages = {
                 /* GET ALL MESSAGES FROM DATABASE*/
                  getMessages: async function(fields=null,limit=100){
                      return await messageModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE MESSAGE FROM DATABASE*/
                  getMessage: async function(messageId,fields=null){
                    const filterObject = { _id: messageId };
                    return await messageModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A MESSAGE TO DATABASE AND RETURN SAVED OBJECT*/
                  addMessage: async function(messageObject){
                    const newMessage = new messageModel(messageObject);
                    return await newMessage.save();
                },
                /* UPDATE A MESSAGE INFO IN DATABASE*/
                  updateMessage: async function(messageId, messageUpdateObject){
                    const filterObject = { _id: messageId };
                    const response = await messageModel.updateOne(filterObject, messageUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A MESSAGE FROM DATABASE*/
                  deleteMessage: async function(messageId){
                    const filterObject = { _id: messageId };
                   //delete message
                   messageModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}