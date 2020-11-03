const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const execQuery = require("../database/trash_db_connection").amalevelz.runQuery;


// GET REQUESTS
/* get all posts */
router.get("/posts", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await posts.getPosts(fields=fields,limit=limit);
       /*response here*/ 
       res.send(result);
       return {query: "done"};
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});


/* get all users */
router.get("/users", (req,res,next)=>{
    let limit =  parseInt(req.query.limit);
    let fields = req.query.fields;
    let username = req.query.username;
    async function queryPlusResponse(){
         /*query runs here*/
         let result = {};
         if(username){
           if(fields){
             result = await users.getUser(null,username,fields);
           }
           else{
             result = await users.getUser(null,username,null);
           }
         }
         else{
             result = await users.getUsers(fields,limit);
         }   
         /*response here*/
         
 
         res.send(result);
         return {query: "done"};
      }
      /* open connection and run query */
      execQuery(queryPlusResponse);
 });
 

//POST REQUESTS

/* create a post */
router.post("/posts", (req,res,next)=>{
    // get post from request
    const postObject = req.body;
    postObject.postId = postObject._id;
    delete postObject._id;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedPost = await posts.addPost(postObject);
       /*log new activity and send notification */
      //  await logActivityAndSendNotification(AddedPost.userId, AddedPost._id, AddedPost.privacy, "posted", [activities.addActivity,notifications.addNotification],[users.getUser,posts.getPost], users.updateUser, users.updateUsers);
       /*response here*/
       res.send(AddedPost);
       return {query: "done"};
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});

/* create a post */
router.post("/users", (req,res,next)=>{
    // get post from request
    const userObject = req.body;
    userObject.userId = userObject._id;
    delete userObject._id;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedUser = await users.addUser(userObject);
       /*log new activity and send notification */
      //  await logActivityAndSendNotification(AddedPost.userId, AddedPost._id, AddedPost.privacy, "posted", [activities.addActivity,notifications.addNotification],[users.getUser,posts.getPost], users.updateUser, users.updateUsers);
       /*response here*/
       res.send(AddedUser);
       return {query: "done"};
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
      return {query: "done"};
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router;