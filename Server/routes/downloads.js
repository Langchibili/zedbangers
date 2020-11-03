const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logPostActionAndSendNotification = require("../functions").logPostActionAndSendNotification;
const getActedOnPost = require("../functions").getActedOnPost;
const getActedOnPostsById = require("../functions").getActedOnPostsById;
const downloads = require("../database/downloads").downloads;
const execQuery = require("../database/connection").amalevelz.runQuery;
const rootdirectory = require("../utilities/constants/rootdirectory");
const static_folder_name = require("../utilities/constants/static_folder_name");
// GET REQUESTS

/* get all downloads */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await downloads.getDownloads();
       /*response here*/ 
       res.send(result);
       return {query: "done"};
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});


/* Actually downloading a file and logging the download */
router.get("/download",(req,res,next)=>{
   let filename = req.query.filename;
   let type = req.query.type;
      let subPath = '';
      if(type === "audio"){
         subPath = "tracks/";
      }
      else if(type === "video"){
         subPath = "videos/";
      }
      else if(type === "image"){
         subPath = "images/";
      }
      else if(type === "attachment"){
         subPath = "attachements/";
      }
      const downloadDir = rootdirectory + static_folder_name + '/files/'+subPath+filename;
      // send download response, meaning, download the file
      res.download(downloadDir, filename)
      
});


/* get many downloads by username */
router.get("/:username", (req,res,next)=>{
   const requestObject = req.query;
   const username = req.params.username;
   async function queryPlusResponse(){
       let userId = await users.getUser("",username, "_id");  //get userid to pull actions for
       userId = userId._id;
       let response;
       /*query runs here*/
       if(requestObject.hasOwnProperty("unique")){
         response = await getActedOnPostsById(userId,requestObject.fields,requestObject.limit,users.getUser,posts.getPosts,requestObject.actionType);
       }
       else{
         response = await getActedOnPost(userId,requestObject.fields,requestObject.limit,users.getUser,downloads.getDownloads,requestObject.actionType);  
       } 
       res.send(response);
       return {query: "done"};
    }
    if(req.params.hasOwnProperty("username") &&  requestObject.hasOwnProperty("limit") &&  requestObject.hasOwnProperty("actionType")){
    /* open connection and run query */
        execQuery(queryPlusResponse);
    }  
    else{
        res.sendStatus(403)
        res.end();
    }
});


//POST REQUESTS

/* create a download */
router.post("/", (req,res,next)=>{
    // get download from request
    const downloadObject = req.body;
    
    //add to database object and sending response object 
    async function queryPlusResponse(){
       console.log(downloadObject);
       /*query runs here: add download, and create activity and send notifitation*/
       await logPostActionAndSendNotification(downloadObject.userId, downloadObject.postId, "download", [activities.addActivity,notifications.addNotification,downloads.addDownload],[users.getUser,posts.getPost], [users.updateUser,posts.updatePost], users.updateUsers);
       
       /*response here*/;
       res.send({"success": "post downloaded"});
       return {query: "done"};
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const downloadId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await downloads.updateDownload(downloadId,updateObject);
      /* response here if found*/ 
      if(result){
         res.send(result);
      }
      else {
      /* sending 404 headers if not found*/ 
         res.sendStatus(404);
      }
      return {query: "done"};
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

//DELETE REQUESTS
router.delete("/:id", (req,res,next)=>{
  const downloadId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await downloads.deleteDownload(downloadId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
      return {query: "done"};
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router