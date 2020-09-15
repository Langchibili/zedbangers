// @ts-ignore
const express = require("express");
const router = express.Router();
const hash = require('hash.js') // password hasher
const users = require("../database/users").users;
const phoneToken = require("generate-sms-verification-code") // verification code generator
const generatedToken = phoneToken(8, {type: 'number'});  //  generate verification code
const execQuery = require("../database/connection").amalevelz.runQuery;


/* create a user */
router.post("/", (req,res,next)=>{
     // get user from request
     let userObject = req.body;
     let currentUserName = userObject.username;
     currentUserName = currentUserName.toLowerCase();
     
     // Isolate the user's password and has it with hash.js
     let unHashedPassword = userObject.password;
     const HashedPassword = hash.sha256().update(unHashedPassword).digest('hex');
     userObject.password = HashedPassword; // add password to user object
     userObject.activation_code =  generatedToken; // add verification code to user object
     //add to database object and sending response object 
      async function queryPlusResponse(){
        
        let response;
        let AddedUser;  
        let errors = {
             error: "user exists",
             errorType: "user"
        }
      
        const getCurrentUser = await users.getUser(null,currentUserName);
        if(getCurrentUser){
             response = errors;
        }
        else{
            if(!userObject.password || !userObject.first_name || !userObject.last_name || !userObject.sex || !userObject.contactNumber){
              errors.error  = "enter required fields";
              errors.errorType = "requiredFields";
              response = errors;
            }
            else{
               userObject.niceName = userObject.first_name + " "+ userObject.last_name;
               response =  AddedUser = await users.addUser(userObject);
            }
            
        }
        
        /*response here*/
        console.log(response); // res object log

        setTimeout(function(){
          res.send(response); // request end
        },1000);
       
        
     }

     /* open connection and run query */
     execQuery(queryPlusResponse);
     
});

module.exports = router