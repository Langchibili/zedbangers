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
     function isEmpty(obj){ // return true if obj is empty
          let isempty = false;
          if(Array.isArray(obj)){
               if(obj.length === 0){
                 isempty = true
               }
          }
          return isempty;
       }
      async function queryPlusResponse(){
        
        let response;
        let AddedUser;  
        let errors = {
             error: "user exists",
             errorType: "user"
        }
      
        const getCurrentUser = await users.getUser(null,currentUserName);
        if(!isEmpty(getCurrentUser)){
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
        
       res.send(response); // request end
      
        
     }

     /* open connection and run query */
     execQuery(queryPlusResponse);
     
});

module.exports = router