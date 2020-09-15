const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const getFeed = require("../functions").getFeed;
const execQuery = require("../database/connection").amalevelz.runQuery;


// POST REQUESTS

/* get user's news feed via a post request */
router.post("/", (req,res,next)=>{
   const requestObject = req.body;

   async function queryPlusResponse(){
       /*query runs here*/
       let response;
       if(requestObject.hasOwnProperty("post_type")){
          response = await getFeed(requestObject.post_type, requestObject.userId,requestObject.fields,requestObject.limit,users.getUser,posts.getPostsByTypeAndUserIds);
       }
       else{
          response = await getFeed(requestObject.userId,requestObject.fields,requestObject.limit,users.getUser,posts.getPostsByUserIds);
       }   
       res.send(response);
       
    }
    if(requestObject.hasOwnProperty("userId") && requestObject.hasOwnProperty("fields") &&  requestObject.hasOwnProperty("limit")){
    /* open connection and run query */
        execQuery(queryPlusResponse);
    }  
    else{
        res.sendStatus(403)
        res.end();
    }
});

module.exports = router