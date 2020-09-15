const express = require("express");
const router = express.Router();
const reposts = require("../database/reposts").reposts;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all reposts */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await reposts.getReposts();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one post by id */
router.get("/:id", (req,res,next)=>{
  const postId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await reposts.getRepost(postId);
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
       const AddedRepost = await reposts.addRepost(postObject);
       
       /*response here*/
       console.log(AddedRepost);
       res.send(AddedRepost);
       
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
      const result = await reposts.updateRepost(postId,updateObject);
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
      await reposts.deleteRepost(postId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router