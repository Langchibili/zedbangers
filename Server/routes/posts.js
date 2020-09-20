const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const activities = require("../database/activities").activities;
const notifications = require("../database/notifications").notifications;
const logActivityAndSendNotification = require("../functions").logActivityAndSendNotification;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS
/* get all posts */
router.get("/", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await posts.getPosts(fields=fields,limit=limit);
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get all user or public posts of a type by userId or taxonomy  or both*/
router.get("/:post_type/:taxonomy/:taxonomyValue", (req,res,next)=>{
   let username = req.query.userId;
   let userId = req.query.userId;
   let post_type =  req.params.post_type;
   let taxonomy = req.params.taxonomy;
   let taxonomyValue = req.params.taxonomyValue;
   let limit =  parseInt(req.query.limit); 
   let fields = req.query.fields;
   
   async function queryPlusResponse(){
       let result;
       /*query runs here*/
       if(userId){
         result = await posts.getUserPostsByTypeAndTaxonomy(post_type, taxonomy, taxonomyValue,"", username, fields, limit);
       }
       else{
         result = await posts.getPostsByTypeAndTaxonomy(post_type, taxonomy, taxonomyValue, fields, limit);
       }
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});


/* get all posts by categories */
router.get("/chat", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await posts.getPosts(fields=fields,limit=limit);
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});


/* get one post by id */
router.get("/:id", (req,res,next)=>{
  const postId = req.params.id;
  const fields = req.query.fields;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await posts.getPost(postId, fields);
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

/* create a post */
router.post("/", (req,res,next)=>{
    // get post from request
    const postObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedPost = await posts.addPost(postObject);
       /*log new activity and send notification */
      //  await logActivityAndSendNotification(AddedPost.userId, AddedPost._id, AddedPost.privacy, "posted", [activities.addActivity,notifications.addNotification],[users.getUser,posts.getPost], users.updateUser, users.updateUsers);
       /*response here*/
       res.send(AddedPost);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});

router.post("/timeline", (req,res,next)=>{
   // get post from request
   const postObject = req.body;
   const postObjectLimit = parseInt(postObject.limit);

   //add to database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      const timeline = await posts.getPostsByUserId(postObject.userId, postObject.fields || "", postObjectLimit);
      /*response here*/
      res.send(timeline);
      
   }

   /* open connection and run query */
   execQuery(queryPlusResponse);
   
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const postId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await posts.updatePost(postId,updateObject);
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
  const postId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await posts.deletePost(postId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router;