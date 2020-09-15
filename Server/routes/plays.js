const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logPostActionAndSendNotification = require("../functions").logPostActionAndSendNotification;
const getActedOnPost = require("../functions").getActedOnPost;
const getActedOnPostsById = require("../functions").getActedOnPostsById;
const plays = require("../database/plays").plays;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all plays */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await plays.getPlays();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one play by id */
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
         response = await getActedOnPost(userId,requestObject.fields,requestObject.limit,users.getUser,plays.getPlay,requestObject.actionType);  
       } 
       res.send(response);
       
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

/* create a play */
router.post("/", (req,res,next)=>{
    // get play from request
    const playObject = req.body;
    
    //add to database object and sending response object 
    async function queryPlusResponse(){
       console.log(playObject);
       /*query runs here: add play, and create activity and send notifitation*/
       await logPostActionAndSendNotification(playObject.userId, playObject.postId, "play", [activities.addActivity,notifications.addNotification,plays.addPlay],[users.getUser,posts.getPost], [users.updateUser,posts.updatePost], users.updateUsers);
       
       /*response here*/;
       res.send({"success": "post played"});
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});



//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const playId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await plays.updatePlay(playId,updateObject);
      /* response here if found*/ 
      if(result){
         res.send(result);
      }
      else {
      /* sending 404 headers if not found*/ 
         res.sendStatus(404);
      }
      
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

//DELETE REQUESTS
router.delete("/:id", (req,res,next)=>{
  const playId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await plays.deletePlay(playId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router