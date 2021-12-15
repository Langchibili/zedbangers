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

     // utility function
     function isEmpty(obj){ // return true if obj is empty
          let isempty = false;
          if(Array.isArray(obj)){
               if(obj.length === 0){
                 isempty = true
               }
          }
          else{
               if(!obj.hasOwnProperty("username")){
                    isempty = true
               }
          }
          return isempty;
     }
     
     // query here
      async function queryPlusResponse(){
          let response;
          let AddedUser; 

          if(userObject.authentication.type === "external"){
               // external auth here
               const getCurrentUser = await users.getUser(null,currentUserName);
               if(!isEmpty(getCurrentUser)){ // if user exists do the following
                    req.session.loggedInUser = getCurrentUser;
                    if(req.session.hasOwnProperty("loggedInUser")){
                         response  = {"success":req.session.loggedInUser};
                    }
                    else{
                         response = {"unsuccesful":"couldn't log you in"};
                    }  
               }
               else{ // if user does not exist, do the following
                    userObject.activation_code = 24395678; // hard coded code, since not important to activate
                    userObject.password = 'this##3isahahahha'; // hard coded password, since not important to activate
                    userObject.account_status = "activated"; // account automatically activated
                    AddedUser = await users.addUser(userObject); // add user
                    req.session.loggedInUser = AddedUser; // log user in
                    if(req.session.loggedInUser){
                         response  = {"success":req.session.loggedInUser};
                    }
                    else{
                         response = {"unsuccesful":"couldn't log you in"};
                    }  

               }
          }
          else{
               let errors = {
                    error: "user exists",
                    errorType: "user"
               }
               // Isolate the user's password and has it with hash.js
               let unHashedPassword = userObject.password;
               const HashedPassword = hash.sha256().update(unHashedPassword).digest('hex');
               userObject.password = HashedPassword; // add password to user object
               userObject.activation_code =  generatedToken; // add verification code to user object
               //add to database object and sending response object 
                    
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
                         response = await users.addUser(userObject);
                         const NewUser = response;
                         req.session.loggedInUser = NewUser; // log user in
                    }
                    
               }
       }
        
       res.send(response); // request end
       return {query: "done"};
     }

     /* open connection and run query */
     execQuery(queryPlusResponse);
     
});

module.exports = router