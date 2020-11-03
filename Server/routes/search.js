const express = require("express");
const router = express.Router();
const posts = require("../database/posts").posts;
const users = require("../database/users").users;
const execQuery = require("../database/connection").amalevelz.runQuery;


/* get all posts by categories */
router.get("/post/:keyword", (req,res,next)=>{
   const keyword = req.params.keyword;
   const keywordArray = keyword.split(" ");
   keyword1 = keywordArray[0];
   keyword2 = keywordArray[1];
   async function queryPlusResponse(){
       /*query runs here*/
       let result = await posts.searchPost(keyword1);
       if(result.length < 1){
           if(keyword2){
            result = await posts.searchPost(keyword2);
           }
       }
       /*response here*/ 
       res.send(result);
       return {query: "done"};
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});


/* get all posts by categories */
router.get("/users/:keyword", (req,res,next)=>{
    const keyword = req.params.keyword;
    const keywordArray = keyword.split(" ");
    keyword1 = keywordArray[0];
    keyword2 = keywordArray[1];
    async function queryPlusResponse(){
        /*query runs here*/
        let result = await users.searchUser(keyword1);
        if(result.length < 1){
            if(keyword2){
             result = await users.searchUser(keyword2);
            }
        }
        /*response here*/ 
        res.send(result);
        return {query: "done"};
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
 });


module.exports = router;