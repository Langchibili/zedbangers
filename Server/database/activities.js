const mongoose = require("mongoose");
const date =  require('date-and-time');
const now = new Date();

//activity schema
const activitySchema = new mongoose.Schema(
  {
		post_id: String,
    status: String,
    privacy: {
       type: String,
       default: "public"
    },
    userId:String,
    otherUserId: String,
    user_picture_xl: String,
    userNiceName: String,
	  user_url: String,
		user_name: String,	
		action_type: String, 
		description: {
			post_url: {type: String},
			post_thumbnail:{type: String},
			body:{type: String}
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


// activity model
const activityModel = mongoose.model("activities",activitySchema,"activities");
                
module.exports.activities = {
                 /* GET ALL ACTIVTIES FROM DATABASE*/
                 getActivities: async function(fields=null,limit=null,arrayOfIds=null, sortObject={_id: -1}){
                  if(!arrayOfIds){
                    return await activityModel.find({},fields,function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }
                    else{
                      return await activityModel.find({ _id : { $in : arrayOfIds } },fields, function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }

                },
                getActivitiesByUserId: async function(userId=null,fields=null,limit=null,arrayOfIds=null, sortObject={_id: -1}){
                  if(!arrayOfIds){
                    return await activityModel.find({userId: userId},fields,function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }
                    else{
                      return await activityModel.find({ userId : { $in : arrayOfIds } },fields, function (err, docs) {
                        if (err){
                            throw err;
                        }
                        return docs;
                     }).sort(sortObject).limit(limit);
                    }

                },
                  /* GET ONE ACTIVITY FROM DATABASE*/
                  getActivity: async function(activityId,fields=null){
                    const filterObject = { _id: activityId };
                    return await activityModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD AN ACTIVITY TO DATABASE AND RETURN SAVED OBJECT*/
                  addActivity: async function(activityObject){
                    const newActivity = new activityModel(activityObject);
                    return await newActivity.save();
                },
                /* UPDATE AN ACTIVITY'S INFO IN DATABASE*/
                  updateActivity: async function(activityId, activityUpdateObject){
                    const filterObject = { _id: activityId };
                    const response = await activityModel.updateOne(filterObject, activityUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE AN ACTIVITY FROM DATABASE*/
                  deleteActivity: async function(activityId){
                    const filterObject = { _id: activityId };
                   //delete activity
                   activityModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}