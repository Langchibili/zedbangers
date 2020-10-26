const express = require("express");
const router = express.Router();
const users = require("../database/users").users;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all users */
router.get("/", (req,res,next)=>{
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
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
});

/* get one user by id */
router.get("/:id", (req,res,next)=>{
   const userId = req.params.id;
   const fields = req.query.fields;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await users.getUser(userId, null, fields);
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

//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
   const updateObject = req.body;
   const userId = req.params.id;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await users.updateUser(userId,updateObject);
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

//DELETE REQUESTS
router.delete("/:id", (req,res,next)=>{
   const userId = req.params.id;
   // DELETE SESSIONS FIRST
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await users.deleteUser(userId);
       /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
       res.send({success: "deleted"});
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

module.exports = router


