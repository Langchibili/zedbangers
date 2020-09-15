const express = require("express");
const router = express.Router();
const ratings = require("../database/ratings").ratings;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all ratings */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await ratings.getRatings();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one rating by id */
router.get("/:id", (req,res,next)=>{
  const ratingId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await ratings.getRating(ratingId);
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

/* create a rating */
router.post("/", (req,res,next)=>{
    // get rating from request
    const ratingObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedRating = await ratings.addRating(ratingObject);
       
       /*response here*/
       console.log(AddedRating);
       res.send(AddedRating);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const ratingId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await ratings.updateRating(ratingId,updateObject);
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
  const ratingId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await ratings.deleteRating(ratingId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router