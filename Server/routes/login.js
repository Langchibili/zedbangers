const express = require("express");
const router = express.Router();
const users = require("../database/users").users;
const execQuery = require("../database/connection").amalevelz.runQuery;
const hash = require('hash.js')

router.post("/", (req,res,next)=>{  
     async function validateUser(){
       // get user object and username from request
      let userObject = req.body;
      let username = userObject.username;
      username = username.toLowerCase();
      
      function isEmpty(obj){ // return true if obj is empty
        let isempty = false;
        if(Array.isArray(obj)){
          if(obj.length === 0){
            isempty = true
          }
        }
        return isempty;
     }
      //check if user exists
      let getCurrentUser = await users.getUser(null,username);
      let LoggedInUserPassword; // initialize empty loggedInUserPassword 

      if(!isEmpty(getCurrentUser)){ // if not empty 
        let password = userObject.password; // get raw unhashed or could be already hashed password, depending on login type
        let HashedPassword; // will assign it to either the raw password after being hashed or the already hashed password sent with a type property 
        const account_status = getCurrentUser.account_status;
  
        // Isolate the user's password from userobject and hash it with hash.js.
        if(userObject.hasOwnProperty("type")){ // check if log in type is set
          if(userObject.type === "onAccountActivation"){ // check if log in is just after account activation
            HashedPassword = password; // since it's after account activation password is already hashed, no need to hash
          }
        }
        else{ // if login is normal
           HashedPassword = hash.sha256().update(password).digest('hex'); // hash it to compare to the in database hashed password
        }
        
        
        
        /*database query runs here*/
        const loggedInUser = await users.getUser(null,username); // get in database user password
        const LoggedInUserPassword = loggedInUser.password; // get in database user password
        
        /*compare the request-sent password that has now being hashed with the database queried password hash*/
        if(HashedPassword  === LoggedInUserPassword){
          if(account_status === "inactived"){
            res.send({"error": "inactived account", "errorType": "account"});
          }
          else {
            req.session.loggedInUser = loggedInUser;
            if(req.session.loggedInUser){
                res.send({"success":req.session.loggedInUser});
            }
            else{
              res.send({"unsuccesful":"couldn't log you in"});
            }  
          }
           
        }
        else{
        /*response here if user password is wrong*/
          res.send({"error": "wrong password", "errorType": "password"});
        }
      }
      else{
          res.send({"error": "user not found", "errorType": "username"});
      }
      return {query: "done"};
    }

    /* open connection and run query */
    execQuery(validateUser); 
});


module.exports = router