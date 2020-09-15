const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//notification schema
const notificationSchema = new mongoose.Schema({
    userId : String,
    post_id: String,
    otherUserId: String,
		user_picture_xl: String,
		user_url: String,
    user_name: String,		
    userNiceName: String,
    action_type: String, 
    privacy: {
      type: String,
      default: "public"
    },
		description: {
			notifications_url: {type: String},
			notifications_thumbnail:{type: String},
			body:{type: String}
		},
		viewed:{
      type: Boolean,
      default: false
    },
		visited:{
      type: Boolean,
      default: false
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


// notification model
const notificationModel = mongoose.model("notifications",notificationSchema,"notifications");
                
module.exports.notifications = {
                 /* GET ALL NOTIFICATIONS FROM DATABASE*/
                 getNotifications: async function(fields=null,limit=null,arrayOfIds=null, sortObject={_id: -1}){
                  if(!arrayOfIds){
                    return await notificationModel.find({},fields,function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }
                    else{
                      return await notificationModel.find({ _id : { $in : arrayOfIds } },fields, function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }

                },
                  /* GET ONE NOTIFICATION FROM DATABASE*/
                  getNotification: async function(notificationId,fields=null){
                    const filterObject = { _id: notificationId };
                    return await notificationModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A NOTIFICATION TO DATABASE AND RETURN SAVED OBJECT*/
                  addNotification: async function(notificationObject){
                    const newNotification = new notificationModel(notificationObject);
                    return await newNotification.save();
                },
                /* UPDATE A NOTIFICATION INFO IN DATABASE*/
                  updateNotification: async function(notificationId, notificationUpdateObject){
                    const filterObject = { _id: notificationId };
                    const response = await notificationModel.updateOne(filterObject, notificationUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A NOTIFICATION FROM DATABASE*/
                  deleteNotification: async function(notificationId){
                    const filterObject = { _id: notificationId };
                   //delete notification
                   notificationModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}