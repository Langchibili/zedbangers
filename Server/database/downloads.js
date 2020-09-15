const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//download schema
const downloadSchema = new mongoose.Schema({
						user_id: String,
						post_id: String,
            type: String,
            downlaod_path: String,
						user_picture_xl: String,
						user_url: String,
						user_name: String,	
						body: {
							post_url: {type: String},
							post_thumbnail: {type: String},
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


// download model
const downloadModel = mongoose.model("downloads",downloadSchema,"downloads");
                
module.exports.downloads = {
                 /* GET ALL DOWNLOADS FROM DATABASE*/
                 getDownloads: async function(fields="",limit=null,arrayOfIds=null,sortObject={_id: -1}){
                  if(!arrayOfIds){
                  return await downloadModel.find({},fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }
                  else{
                      return await downloadModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                  }).sort(sortObject).limit(limit);
                  }

              },
           /* GET ALL PLAYS FROM DATABASE*/
             getDownloadsByUserIds: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                  return await downloadModel.find({ userId : { $in : arrayOfIds } },fields,function (err, docs) {
                  if (err){
                      throw err;
                  }
                  return docs;
              }).sort(sortObject).limit(limit);
              },
                  /* GET ONE DOWNLOAD FROM DATABASE*/
                  getDownload: async function(downloadId,fields=null){
                    const filterObject = { _id: downloadId };
                    return await downloadModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A DOWNLOAD TO DATABASE AND RETURN SAVED OBJECT*/
                  addDownload: async function(downloadObject){
                    const newDownload = new downloadModel(downloadObject);
                    return await newDownload.save();
                },
                /* UPDATE A DOWNLOAD INFO IN DATABASE*/
                  updateDownload: async function(downloadId, downloadUpdateObject){
                    const filterObject = { _id: downloadId };
                    const response = await downloadModel.updateOne(filterObject, downloadUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A DOWNLOAD FROM DATABASE*/
                  deleteDownload: async function(downloadId){
                    const filterObject = { _id: downloadId };
                   //delete download
                   downloadModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}