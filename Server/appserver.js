const express = require("express"); // express 
const cors = require("cors");  // cors
const app = express();  // express aspp
const session = require('express-session')// express-session

//constants
const rootdirectory = require("./utilities/constants/rootdirectory");
const static_folder_name = require("./utilities/constants/static_folder_name");


const PORT = process.env.PORT || 2000; //port


// SEVER RUNNING ON ENVIRONMENT PORT OR 1000
const server = app.listen(PORT,()=>{
    console.log("static app server running on port "+PORT);
});


/* secured headers */
app.set('trust proxy', 1) // trust first proxy
/* express router | all routes */

/* CORS (Cross Origin Requests Handling) */
const corsOptions = {
  origin:true,
  credentials: true
};


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  } else {
      next();
  }
});
app.use(cors(corsOptions));


/* static folder */

app.use(express.static(rootdirectory+static_folder_name));
app.use((req,res,next)=>{
    res.sendFile(rootdirectory+static_folder_name+"/index.html");
});  
