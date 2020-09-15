const express = require("express");
const router = express.Router();
const albums = require("../database/albums").albums;
const execQuery = require("../database/connection").amalevelz.runQuery;


// GET REQUESTS
/* get all albums */
router.get("/", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
       /*query runs here*/
       const result = await albums.getAlbums(fields=fields,limit=limit);
       /*response here*/ 
       res.send(result);
    }
    /* open connection and run query */
    execQuery(queryPlusResponse);
});

/* get one album by id */
router.get("/:id", (req,res,next)=>{
  const albumId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await albums.getAlbum(albumId);
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

/* create a album */
router.post("/", (req,res,next)=>{
    // get album from request
    const albumObject = req.body;

    //add to database object and sending response object 
    async function queryPlusResponse(){
       /*query runs here*/
       const AddedAlbum = await albums.addAlbum(albumObject);
       
       /*response here*/
       console.log(AddedAlbum);
       res.send(AddedAlbum);
       
    }

    /* open connection and run query */
    execQuery(queryPlusResponse);
    
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const albumId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await albums.updateAlbum(albumId,updateObject);
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
  const albumId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await albums.deleteAlbum(albumId);
      /*RESPOND THAT DELETE WAS SUCCESSFULL*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router;