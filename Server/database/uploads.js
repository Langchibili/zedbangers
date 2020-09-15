const mongoose = require("mongoose");

//upload schema
const uploadSchema = new mongoose.Schema({
    user_id: String,
    user_picture_xl: String,
    user_url: String,
    user_name: String,
    post_id : String,
    type: String,
    image:{
      image_full_path: { type: String },
      uri_path: { type: String },
      size:  { type: Number },
      user_id: { type: String },
      cover: { type: String },
      medium: { type: String },
      thumbnail: { type: String },
      small: { type: String },
      cover_xl: { type: String },
      type: { type: String },
      size: Number
    },					
    track:{
        uri_path: { type: String },
        duration:{ type: Number },
        meme_type: { type: String },
        full_track_path : { type: String },
        track_snippet_path: { type: String },
        track_thumbnail: { type: String },
        size: { type: Number },
        download_link: { type: String }
      },
    video: {
      uri_path: { type: String },
      duration:{ type: Number },
      meme_type: { type: String },
      full_video_path : { type: String },
      video_snippet_path: { type: String },
      video_thumbnail: { type: String },
      size: { type: Number },
      download_link: { type: String }
    },
    atttachment: {
        uri_path: { type: String },
        full_attachment_path : { type: String },
        meme_type: String,
        size: { type: Number },
        download_link: { type: String },
    },
    timestamp: {
        type:Date,
        default:Date.now()
      }
});


// upload model
const uploadModel = mongoose.model("uploads",uploadSchema,"uploads");
                
module.exports.uploads = {
                 /* GET ALL UPLOADS FROM DATABASE*/
                  getUploads: async function(fields=null,limit=100){
                      return await uploadModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE UPLOAD FROM DATABASE*/
                  getUpload: async function(uploadId,fields=null){
                    const filterObject = { _id: uploadId };
                    return await uploadModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A UPLOAD TO DATABASE AND RETURN SAVED OBJECT*/
                addUpload: async function(uploadObject){
                    const newUpload = new uploadModel(uploadObject);
                    return await newUpload.save();
                },
                /* UPDATE A UPLOAD INFO IN DATABASE*/
                  updateUpload: async function(uploadId, uploadUpdateObject){
                    const filterObject = { _id: uploadId };
                    const response = await uploadModel.updateOne(filterObject, uploadUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A UPLOAD FROM DATABASE*/
                  deleteUpload: async function(uploadId){
                    const filterObject = { _id: uploadId };
                   //delete upload
                   uploadModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}