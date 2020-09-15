const express = require("express");
const router = express.Router();
const messages = require("../database/messages").messages;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all messages */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await messages.getMessages();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one message by id */
router.get("/:id", (req,res,next)=>{
  const messageId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await messages.getMessage(messageId);
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

/* create a message */
router.post("/", (req,res,next)=>{
    // get message from request
    const messageObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedMessage = await messages.addMessage(messageObject);
       
       /*response here*/
       console.log(AddedMessage);
       res.send(AddedMessage);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const messageId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await messages.updateMessage(messageId,updateObject);
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
  const messageId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await messages.deleteMessage(messageId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router