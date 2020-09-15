const express = require("express");
const router = express.Router();
const shares = require("../database/shares").shares;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all shares */
router.get("/", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
        /*query runs here*/
        const result = await users.getShares(fields=fields,limit=limit);
        /*response here*/ 
        res.send(result);
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
});
/* get one share by id */
router.get("/:id", (req,res,next)=>{
  const shareId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await shares.getShare(shareId);
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

/* create a share */
router.post("/", (req,res,next)=>{
    // get share from request
    const shareObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedShare = await shares.addShare(shareObject);
       
       /*response here*/
       console.log(AddedShare);
       res.send(AddedShare);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const shareId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await shares.updateShare(shareId,updateObject);
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
  const shareId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await shares.deleteShare(shareId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router