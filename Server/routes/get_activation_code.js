const express = require("express");
const router = express.Router();
const users = require("../database/users").users;
const execQuery = require("../database/connection").amalevelz.runQuery;
const sms = require("../sms");

// POST REQUESTS

/* activate user */
router.post("/", (req,res,next)=>{
   let username = req.body.username;
   async function queryPlusResponse(){
        let response;
        /*query runs here*/
        if(username){
            const queryResponse = await users.getUser(null,username);
            if(queryResponse){
               const userObj = await users.getUser(null,username);
               const activation_code = userObj.activation_code;
               const messageSent = await sms.sendText(userObj.contactNumber,userObj.niceName+" your amalevelz account activation code is: "+activation_code);
               response = {"success": "activation_code sent"};
               console.log(messageSent);
            }
            else{
                response = {"error": "couldn't send code"};
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