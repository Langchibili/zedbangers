const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const uploads = require("../database/uploads").uploads;
const execQuery = require("../database/connection").amalevelz.runQuery;
const IncomingForm = require("formidable").IncomingForm;
const rootdirectory = "C:/Users/Z. Goldwyn/Desktop/amalevelz";
const videoThumnaiGenerator = require("../processes/video-thumnail-generation");
//const videoProcesser = require("../processes/video-processing");
const api_url = require("../../constants/api");

/* UUID CODE*/
const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: Date.now(),
  nsecs: 5678
};
const myUuid = "-AMALEVELZ.COM-" + uuidv1(v1options); 


// GET REQUESTS

/* get all uploads */
router.get("/", (req,res,next)=>{
   let limit =  parseInt(req.query.limit);
   let fields = req.query.fields;
   async function queryPlusResponse(){
        /*query runs here*/
        const result = await uploads.getUploads(fields=fields,limit=limit);
        /*response here*/ 
        res.send(result);
     }
     /* open connection and run query */
     execQuery(queryPlusResponse);
});
/* get one upload by id */
router.get("/:id", (req,res,next)=>{
  const uploadId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await uploads.getUpload(uploadId);
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

/* create an upload */
router.post("/", (req,res,next)=>{
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, 'public/files');
            },
        
            // By default, multer removes file extensions so let's add them back
            filename: function(req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
    let upload = multer({ storage: storage}).single("filepond");
    upload(req,res,()=>{ setTimeout(()=>{res.end();},60*60*1000)});
  
});


//PUT REQUESTS
router.put("/:id", (req,res,next)=>{
  const updateObject = req.body;
  const uploadId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      const result = await uploads.updateUpload(uploadId,updateObject);
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
  const uploadId = req.params.id;
  async function queryPlusResponse(){
      /*query runs here*/
      await uploads.deleteUpload(uploadId);
      /*rREDIRECT USER TO HOMEPAGE AND NOT SEND ANY RESPONSE*/ 
      res.send({success: "deleted"});
   }
   /* open connection and run query */
   execQuery(queryPlusResponse);
});

module.exports = router