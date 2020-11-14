const express = require("express");
const router = express.Router();
const playlists = require("../database/playlists").playlists;
const posts = require("../database/posts").posts;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all playlists */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await playlists.getPlaylists();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one playlist by id */
router.get("/:id", (req,res,next)=>{
  const playlistId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await playlists.getPlaylist(playlistId);
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


/* get one playlist by id */
router.post("/songs", (req,res,next)=>{
   const postIds = req.body.postIds;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await posts.getPostsByPostIds("",req.body.limit, postIds);
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

getPostsByPostIds

router.post("/timeline", (req,res,next)=>{
   // get post from request
   const playlistObject = req.body;
   const playlistObjectLimit = parseInt(playlistObject.limit);

   //add to database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      const playlistsTimeline = await playlists.getPlaylistByUserId(playlistObject.userId, playlistObject.fields || "", playlistObjectLimit);
      console.log("at least hit",playlistsTimeline);
      /*response here*/
      res.send(playlistsTimeline);
      return {query: "done"};
   }

   /* open connection and run query */
   execQuery(queryPlusResponse);
   
});

//POST REQUESTS

/* create a playlist */
router.post("/", (req,res,next)=>{
    // get playlist from request
    const playlistObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedPost = await playlists.addPlaylist(playlistObject);
       
       /*response here*/
       console.log(AddedPost);
       res.send(AddedPost);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const playlistId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await playlists.updatePlaylist(playlistId,updateObject);
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
  const playlistId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await playlists.deletePlaylist(playlistId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router