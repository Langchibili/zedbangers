const express = require("express");
const router = express.Router();
const reviews = require("../database/reviews").reviews;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all reviews */
router.get("/", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
        /*query runs here*/
        const result = await users.getReviews(fields=fields,limit=limit);
        /*response here*/ 
        res.send(result);
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
});

/* get one review by id */
router.get("/:id", (req,res,next)=>{
  const reviewId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await reviews.getReview(reviewId);
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

/* create a review */
router.post("/", (req,res,next)=>{
    // get review from request
    const reviewObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedReview = await reviews.addReview(reviewObject);
       
       /*response here*/
       console.log(AddedReview);
       res.send(AddedReview);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const reviewId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await reviews.updateReview(reviewId,updateObject);
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
  const reviewId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await reviews.deleteReview(reviewId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router