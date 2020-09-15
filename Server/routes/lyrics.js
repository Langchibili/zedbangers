const express = require("express");
const router = express.Router();
const lyrics = require("../database/lyrics").lyrics;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all lyrics */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await lyrics.getLyrics();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one lyric by id */
router.get("/:id", (req,res,next)=>{
  const lyricId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await lyrics.getLyric(lyricId);
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

/* create a lyric */
router.post("/", (req,res,next)=>{
    // get lyric from request
    const lyricObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedLyric = await lyrics.addLyric(lyricObject);
       
       /*response here*/
       console.log(AddedLyric);
       res.send(AddedLyric);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const lyricId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await lyrics.updateLyric(lyricId,updateObject);
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
  const lyricId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await lyrics.deleteLyric(lyricId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router