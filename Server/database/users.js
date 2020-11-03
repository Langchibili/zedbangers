const mongoose = require("mongoose");
const date =  require('date-and-time');
const api = require("../utilities/constants/api");
const docApiConcatinator = require("../functions").docApiConcatinator;
const now = new Date();

//user schema
const userSchema = new mongoose.Schema({
    account_status: {
      type: String,
      default: "inactived"
    },
    activation_code: {
      type:Number,
      required: true
    },
    user_type: {
        type: String,
        default: "normal"
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password:{
      type: String,
      required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    userId: String,
    niceName: String,
    sex: String,
    age: Number,
    nationality: String,
    bio: {
      email: {
        type: String,
        default: "[email&#160;protected]"
      },
      adress: String,
      location: String,
      country: Number,
      website: String,
      about: {
        type: String,
        default: "No personal information added"
      },
      workAndEducation: {
        title: String,
        role: String,
        qualifications: [String]
      },
      Interests: [String],
      languages: [String]
    },
    contactNumber:String,
    linkToArtistPage: String,
    externalArtisturl: {
        facebook: String,
        twitter: String,
        soundcloud: String,
        google: String
    },
    verified:Boolean,
    label: String,
    verifiedUploaders: [],
    uploadatistsfor: [],
    picture: {
      cover: { type: String, default : "/files/images/blankcover.jpg" },
      medium: { type: String },
      thumbnail: { type: String, default : "/files/images/blankprofile.png" },
      small: { type: String }     
    },
    picture_small: String,
    picture_medium: String,
    picture_big: {
      type: String,
      default : "/files/images/blankcover.jpg"
     },
    picture_xl: String,
    cover_photo: {
      cover: { type: String, default : "/files/images/blankcover.jpg" },
      medium: { type: String },
      thumbnail: { type: String },
      small: { type: String }    
    },
    isVerifiedUploader: Boolean,
    following: [String],
    followers: [String],
    mutualFollowers: [String],
    notifications:[String],
    likes: [],
    liked: [],
    views: [],
    viewed: [],
    plays: [],
    played: [],
    downloads: [],
    downloadedPosts: [],
    likedPosts: [],
    viewedPosts: [],
    playedPosts: [],  
    downloads: [],
    downloaded: [],
    counts: {
      following: {
        type: Number,
        default: 0
      } ,
      followers: {
        type: Number,
        default: 0
      } ,
      mutualFollowers: {
        type: Number,
        default: 0
      } ,
      notifications: {
        type: Number,
        default: 0
      } ,
      downloads: {
        type: Number,
        default: 0
      },
      downloaded: {
        type: Number,
        default: 0
      },
      likes: {
        type: Number,
        default: 0
      } ,
      liked: {
        type: Number,
        default: 0
      },
      plays: {
        type: Number,
        default: 0
      } ,
      played: {
        type: Number,
        default: 0
      },
      shares: {
        type: Number,
        default: 0
      } ,
      views: {
        type: Number,
        default: 0
      } ,
      viewed: {
        type: Number,
        default: 0
      } ,
      totalcounts: {
        type: Number,
        default: 0
      } ,
      reposts: {
        type: Number,
        default: 0
      } ,
      comments: {
        type: Number,
        default: 0
      } ,
      replies: {
        type: Number,
        default: 0
      } ,
      commentsAndReplies: {
        type: Number,
        default: 0
      } ,
      numberOfposts: {
        type: Number,
        default: 0
      } 
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
    privacy:{
      visibility:{
        showlikedposts: {
          type: Boolean,
          default: true
        },
        showlikedplaylists: {
          type: Boolean,
          default: true
        },
      }
    },
    tags: [String]
  });


// user model
const userModel = mongoose.model("users",userSchema,"users");
                
module.exports.users = {
                 /* GET ALL USERS FROM DATABASE*/
                  getUsers: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                    if(!arrayOfIds){
                      return await docApiConcatinator(api, null, await userModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).sort(sortObject).limit(limit));
                      }
                      else{
                        return await docApiConcatinator(api, null, await userModel.find({ _id : { $in : arrayOfIds } },fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).sort(sortObject).limit(limit));
                      }

                  },
                  getUsersByIdsInverse: async function(fields=null,limit=null,arrayOfIds=null,sortObject={_id: -1}){
                    return await docApiConcatinator(api, null, await userModel.find({ _id : { $nin : arrayOfIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                   }).sort(sortObject).limit(limit));
                  },
                  /* GET ONE USERS FROM DATABASE*/
                  getUser: async function(userId=null,username=null,fields=null){
                    let filterObject = {};
                    if(userId){
                        filterObject = { _id: userId };
                    }
                    else{
                        username = username.toLowerCase(); // change username to lowercase first
                        filterObject = { username: username };
                    }
                    return await docApiConcatinator(api, await userModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     }))
            },
                /* ADD A USER TO DATABASE AND RETURN SAVED OBJECT*/
                  addUser: async function(userObject){
                    postObject.username = postObject.username.toLowerCase();
                    postObject.first_name = postObject.first_name.toLowerCase();
                    postObject.last_name = postObject.last_name.toLowerCase();
                    postObject.tags = [postObject.first_name, postObject.last_name];
                    const newUser = new userModel(userObject);
                    return await newUser.save();
                },

                /* UPDATE A USER INFO IN DATABASE*/
                  updateUser: async function(userId, userUpdateObject){
                    const filterObject = { _id: userId };
                    const response = await userModel.updateOne(filterObject, userUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },

                /* UPDATE MANY USERS' INFO IN DATABASE EITHER AN ENTIRE OBJECT, OR AN ARRAY PART OF USERS OBJECTS*/
                updateUsers: async function(userIds, updateObject=null, updateType="updateObject", arrayNameToUpdate=null, valueToPushInArray=null){
                  let userUpdateObject = {}; // set the object to use to update users' documents empty first
                  const fields = arrayNameToUpdate + " counts"; // set the object to use to update users' documents empty first
                  if(updateType === "updateObject"){ // if updateType is updateObject, then only use the provided updateobject to update users' docs
                    userUpdateObject =  updateObject;
                    const filterObject = { _id: { $in : userIds } }; // filter through by checking every time if the id in the moment of execution is in the userIds array
                    const response = await userModel.updateMany(filterObject, userUpdateObject); // update users docs
                    const updated = { updated: response.n };
                    return updated; // return number of updated docs
                  }
                  if(updateType === "pushInArray"){ 
                   let arraysOfUsersObjects = await userModel.find({ _id : { $in : userIds } },fields,function (err, docs) {
                      if (err){
                          throw err;
                      }
                      return docs;
                   });  // get the array of all the users' ids' objects and only get the specified fields
                   
                   arraysOfUsersObjects.forEach(async function(element){ // loop through the array and update each users' objects by pusshing into the provide arrayName
                    userUpdateObject = {} // refleshing the userUpdateObject object
                    let count; // declare and unset count variable for array list counts
                    let countsObject = element.counts; // get initial counts object
                    const filterObject = { _id: element._id }; // setting filter object to have the user id in the moment
                    let arrayToUpdate = element[arrayNameToUpdate]; // getting the array to update using the name, eg, notifications
                    count = arrayToUpdate.push(valueToPushInArray); // mutate array to updte by adding the value
                    countsObject[arrayNameToUpdate] = count; // update the counts for the arrayNameToUpdate
                    userUpdateObject[arrayNameToUpdate] = arrayToUpdate; // add arrayNameToUpdate to userUpdateObject
                    userUpdateObject["counts"] = countsObject; // add count to userUpdateObject
                    await userModel.updateOne(filterObject, userUpdateObject);
                  });
                  }
                 },

                /* DELETE A USER FROM DATABASE*/
                  deleteUser: async function(userId){
                    const filterObject = { _id: userId };
                   //delete user
                   userModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } ,
                searchUser: async function(keyword, fields=null, limit=null){
                  keyword = keyword.toLowerCase();
                  return await docApiConcatinator(api, null, await postModel.find({ ["tags"] : keyword },fields,function (err, docs) {
                    if (err){
                        throw err;
                    }
                    return docs;
                 }).sort(sortObject={_id: -1}).limit(limit));             
                }
}