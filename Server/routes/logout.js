const express = require("express");
const router = express.Router();

/* logout a user */
router.get("/", (req,res,next)=>{
     req.session.destroy((err)=>{
        if(err) { console.log(err)}
        else{
             res.send({success: "loggedout"});
        }
     });
});


module.exports = router