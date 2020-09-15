const express = require("express");
const router = express.Router();
const activities = require("../database/activities").activities;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all activities */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await activities.getActivities();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one activity by id */
router.get("/:id", (req,res,next)=>{
  const activityId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await activities.getActivity(activityId);
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

/* create a activity */
router.post("/", (req,res,next)=>{
   // get activity from request
   const activityObject = req.body;
   const activityObjectLimit = parseInt(activityObject.limit); 
   //add to database object and sending response object 
   async function queryPlusResponse(){
      /*query runs here*/
      if(!activityObject.userId){
        res.send([]);
      }
      else{
        const getActivities = await activities.getActivitiesByUserId(activityObjectLimit.userId,"",activityObjectLimit);
        /*response here*/
        
        res.send(getActivities);
      }
      
   }

   /* open connection and run query */
   execQuery(queryPlusResponse);
   
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const activityId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await activities.updateActivity(activityId,updateObject);
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
  const activityId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await activities.deleteActivity(activityId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router