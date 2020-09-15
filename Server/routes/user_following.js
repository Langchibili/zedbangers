const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logFollowActivityAndSendNotification = require("../functions").logFollowActivityAndSendNotification;
const addFollower = require("../functions").addFollower;
const unFollow = require("../functions").unFollow;
const getFollowers = require("../functions").getFollowers;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get user's followers by userId from username */
router.get("/:username", (req,res,next)=>{
   const username = req.params.username;
   const requestObject = req.query;
   if(typeof requestObject.limit === "string"){
    requestObject.limit = parseInt(requestObject.limit);
   }
   async function queryPlusResponse(){
       let userId = await users.getUser("",username, "_id");
       userId = userId._id;
       let response;
       /*query runs here*/
       if(requestObject.notIn){
        response = await getFollowers(userId,requestObject.subject,requestObject.fields,requestObject.limit,users.getUser,users.getUsersByIdsInverse);
       }
       else{
        response = await getFollowers(userId,requestObject.subject,requestObject.fields,requestObject.limit,users.getUser,users.getUsers);
       }
          
       res.send(response);
       
    }
    if(requestObject.hasOwnProperty("subject") && requestObject.hasOwnProperty("fields") &&  requestObject.hasOwnProperty("limit")){
    /* open connection and run query */
        execQuery(queryPlusResponse);
    }  
    else{
        res.sendStatus(403)
        res.end();
    }
});

router.post("/", (req,res,next)=>{
    // get post from request
    const userFollowingObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const followResponse = await addFollower(userFollowingObject.userId, userFollowingObject.otherUserId, users.getUser, users.updateUser);
       // log acitvity and notification here
       await logFollowActivityAndSendNotification(userFollowingObject.userId, userFollowingObject.otherUserId, [activities.addActivity,notifications.addNotification],users.getUser, users.updateUser);
       /*response here*/
       res.send(followResponse);
    }

    /* open connection and run query */
    if(userFollowingObject.hasOwnProperty("userId") &&  userFollowingObject.hasOwnProperty("otherUserId")){
       execQuery(queryPlusResponse);
    }  
    else{
        res.sendStatus(403)
        res.end();
    }
});



//DELETE REQUESTS
router.delete("/", (req,res,next)=>{

   // get delete object from request
   const userFollowingObject = req.body;

   // query database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      const followResponse = await unFollow(userFollowingObject.userId, userFollowingObject.otherUserId, users.getUser, users.updateUser);
      
      /*response here*/
      res.send(followResponse);
   }

   /* open connection and run query */
   if(userFollowingObject.hasOwnProperty("userId") &&  userFollowingObject.hasOwnProperty("otherUserId")){
      execQuery(queryPlusResponse);
   }  
   else{
       res.sendStatus(403)
       res.end();
   }
});

module.exports = router
