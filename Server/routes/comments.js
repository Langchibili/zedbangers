const express = require("express");
const router = express.Router();
const comments = require("../database/comments").comments;
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logActivityAndSendNotification = require("../functions").logActivityAndSendNotification;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all comments */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const post_id  = req.params.postId;
       const comment_id  = req.params.comment_id;
       const user_id  = req.params.user_id;
       const post_type  = req.params.post_type;
       const comment_type  = req.params.comment_type;
       let filterBy;
       if(post_id && comment_id && user_id && post_type && comment_type)
       {
         filterBy = {
            post_id : post_id,
            comment_id: comment_id,
            user_id: user_id,
            post_type: post_type,
            comment_type: comment_type
         }
      }
      else if(user_id && post_type)
       {
         filterBy = {
            user_id: user_id,
            post_type: post_type
         }
      }
      else{
         filterBy = {};
      }

       const result = await comments.getComments({},filterBy || {});
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one comment by id */
router.get("/:id", (req,res,next)=>{
  const commentId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await comments.getComment(commentId);
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

/* create a comment */
router.post("/", (req,res,next)=>{
    // get comment from request
    const commentObject = req.body;
    const postId = commentObject.post_id;
    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedComment = await comments.addComment(commentObject);
       // log activity and send notification
       await logActivityAndSendNotification(AddedComment.user_id, postId, "private", "commented", [activities.addActivity,notifications.addNotification],[users.getUser,posts.getPost], users.updateUser, users.updateUsers);
         const post_counts = await posts.getPost(postId,"counts"); /// get posts comments count
         post_counts.counts.comments += 1;
         post_counts.counts.commentsAndReplies += 1;
         const new_counts = post_counts.counts;
         await posts.updatePost(postId, {counts: new_counts}); // update post counts
       
       /*response here*/
       res.send(AddedComment);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


/* get a comment by post request */
router.post("/get", (req,res,next)=>{
   // get comment from request
   const commentObject = req.body;
   const commentObjectLimit = parseInt(commentObject.limit); // turn possibly string int to int
   //add to database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      const getComments = await comments.getComments(commentObject.postId, "", commentObjectLimit);
   
      /*response here*/
      res.send(getComments);
      
   }

   /* open connection and run query */
   execQuery(queryPlusResponse);
   
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const commentId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await comments.updateComment(commentId,updateObject);
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
  const commentId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await comments.deleteComment(commentId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router