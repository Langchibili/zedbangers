const express = require("express");
const router = express.Router();
const replies = require("../database/replies").replies;
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logActivityAndSendNotification = require("../functions").logActivityAndSendNotification;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all replies */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await replies.getReplies();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one reply by id */
router.get("/:id", (req,res,next)=>{
  const replyId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await replies.getReply(replyId);
      /*response here if found*/ 
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


//POST REQUESTS

/* create a reply */
router.post("/", (req,res,next)=>{
    // get reply from request
    const replyObject = req.body;
    const postId = req.body.post_id;
    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedReply = await replies.addReply(replyObject);
       // log activity and send notification
       await logActivityAndSendNotification(AddedReply.user_id, postId, "private", "replied", [activities.addActivity,notifications.addNotification],[users.getUser,posts.getPost], users.updateUser, users.updateUsers);
       const post_counts = await posts.getPost(postId,"counts"); /// get posts comments count
       post_counts.counts.replies += 1;
       post_counts.counts.commentsAndReplies += 1;
       const new_counts = post_counts.counts;
       await posts.updatePost(postId, {counts: new_counts}); // update post counts
      
       /*response here*/
       console.log(AddedReply);
       res.send(AddedReply);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});

/* get a reply by post request */
router.post("/get", (req,res,next)=>{
   // get reply from request
   const replyObject = req.body;
   const replyObjectLimit = parseInt(replyObject.limit); // turn possibly string int to int
   //add to database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      const getReplies = await replies.getReplies(replyObject.commentId, "", replyObjectLimit);
      
      /*response here*/
      res.send(getReplies);
      
   }

   /* open connection and run query */
   execQuery(queryPlusResponse);
   
});

//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const replyId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await replies.updateReply(replyId,updateObject);
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
  const replyId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await replies.deleteReply(replyId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router