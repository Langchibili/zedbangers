const express = require("express");
const router = express.Router();
const categories = require("../database/categories").categories;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS

/* get all categories */
router.get("/", (req,res,next)=>{
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await categories.getCategories();
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one category by id */
router.get("/:id", (req,res,next)=>{
  const categoryId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await categories.getCategory(categoryId);
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

/* create a category */
router.post("/", (req,res,next)=>{
    // get category from request
    const categoryObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedCategory = await categories.addCategory(categoryObject);
       
       /*response here*/
       console.log(AddedCategory);
       res.send(AddedCategory);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const categoryId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await categories.updateCategory(categoryId,updateObject);
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
  const categoryId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await categories.deleteCategory(categoryId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router