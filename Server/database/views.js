const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//View schema
const viewSchema = new mongoose.Schema({
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
                  default: now
              },
      revisions: []
    },
});


// View model
const viewModel = mongoose.model("views",viewSchema,"views");
                
module.exports.views = {
                 /* GET ALL views FROM DATABASE*/
                 getViews: async function(fields="",limit=null,arrayOfIds=null,sortObject={_id: -1}){
                  if(!arrayOfIds){
                  return await viewModel.find({},fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }
                  else{
                      return await viewModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }

              },
              getViewsByPostId: async function(fields="",limit=null,arrayOfIds=null, sortObject={_id: -1}){
                return await viewModel.find({ post_id : { $in : arrayOfIds } },fields,function (err, docs) {
                  if (err){
                      throw err;
                  }
                  return docs;
              }).sort(sortObject).limit(limit);

              },
            /* GET ALL PLAYS FROM DATABASE*/
              getViewsByUserIds: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                    return await viewModel.find({ userId : { $in : arrayOfIds } },fields,function (err, docs) {
                    if (err){
                        throw err;
                    }
                    return docs;
                }).sort(sortObject).sort('-date').limit(limit);
              },
                  /* GET ONE View FROM DATABASE*/
                  getView: async function(viewId,fields=null){
                    const filterObject = { _id: viewId };
                    return await viewModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A View TO DATABASE AND RETURN SAVED OBJECT*/
                  addView: async function(viewObject){
                    const newView = new viewModel(viewObject);
                    return await newView.save();
                },
                /* UPDATE A View INFO IN DATABASE*/
                  updateView: async function(viewId, viewUpdateObject){
                    const filterObject = { _id: viewId };
                    const response = await viewModel.updateOne(filterObject, viewUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A View FROM DATABASE*/
                  deleteView: async function(viewId){
                    const filterObject = { _id: viewId };
                   //delete View
                   viewModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}