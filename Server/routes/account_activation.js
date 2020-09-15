const express = require("express");
const router = express.Router();
const users = require("../database/users").users;
const execQuery = require("../database/connection").amalevelz.runQuery;

// POST REQUESTS

/* activate user */
router.post("/", (req,res,next)=>{
   let username = req.body.username;
   let activation_code = req.body.activation_code;
   async function queryPlusResponse(){
        /*change activation_code to number from string, if sttring*/
        activation_code = typeof activation_code === "string"? parseInt(activation_code): activation_code;
        let response;
        /*query runs here*/
        if(username){
            const queryResponse = await users.getUser(null,username);
            if(queryResponse){
               if(queryResponse.activation_code === activation_code){
                const updateObject = { account_status: "acitvated"}   
                const updateQueryResponse = await users.updateUser(queryResponse._id,updateObject);
                if(updateQueryResponse){
                    res.send({"success": "account activated"});
                }
               }
               else{
                   res.send({"error":"invalid code"});
               }
            }
            else{
                response = {"error": "couldn't activate account"};
            }   
        }
        else{
             response = {"error": "user not found"};
        }   
        /*response here*/ 
        res.send(response);
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
});

module.exports = router