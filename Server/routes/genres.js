const express = require("express");
const router = express.Router();
const genres = require("../database/genres").genres;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all genres */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await genres.getGenres();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one genre by id */
router.get("/:id", (req,res,next)=>{
  const genreId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await genres.getGenre(genreId);
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

/* create a genre */
router.post("/", (req,res,next)=>{
    // get genre from request
    const genreObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedGenre = await genres.addGenre(genreObject);
       
       /*response here*/
       console.log(AddedGenre);
       res.send(AddedGenre);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const genreId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await genres.updateGenre(genreId,updateObject);
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
  const genreId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await genres.deleteGenre(genreId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router