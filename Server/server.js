const express = require("express"); // express 
const mongoose = require("mongoose"); // mongoose
const cors = require("cors");  // cors
const app = express();  // express aspp
const session = require('express-session')// express-session
const session_secret = require("./utilities/secrets/secrets").session_secret; // sms secret
const bodyParser = require("body-parser"); // body parser 
const expressLimit = require("express-limit").limit;
const MongoDBStore = require('connect-mongodb-session')(session); // connect-mongodb-session 
const timeout = require('connect-timeout');// timeout midleware
const helmet = require('helmet')
//routes requires
const usersRouter = require("./routes/users"); 
const accountActivation = require("./routes/account_activation");
const getActivationCode = require("./routes/get_activation_code");
const userFollowing = require("./routes/user_following"); 
const newsFeed = require("./routes/newsfeed"); 
const signupRouter = require("./routes/signup"); 
const loginRouter = require("./routes/login"); 
const logoutRouter = require("./routes/logout"); 
const postsRouter = require("./routes/posts");
const albumsRouter = require("./routes/albums"); 
const activitiesRouter = require("./routes/activities");
const categoriesRouter = require("./routes/categories");
const commentsRouter = require("./routes/comments");
const genresRouter = require("./routes/genres");
const likesRouter = require("./routes/likes");
const playlistsRouter = require("./routes/playlists");
const repliesRouter = require("./routes/replies");
const repostsRouter = require("./routes/reposts");
const uploadsRouter = require("./routes/uploads");
const downloadsRouter = require("./routes/downloads"); 
const lyricsRouter = require("./routes/lyrics");
const messagesRouter = require("./routes/messages");
const notificationsRouter = require("./routes/notifications");
const playsRouter = require("./routes/plays");
const viewsRouter = require("./routes/views");
const ratingsRouter = require("./routes/ratings");
const reviewsRouter = require("./routes/reviews");
const sharesRouter = require("./routes/shares");
const trashRouter = require("./routes/trash");
const searchRouter = require("./routes/search");
//routes requires endline

//constants
const rootdirectory = require("./utilities/constants/rootdirectory");
const static_folder_name = require("./utilities/constants/static_folder_name");
const sessions_db_url = require("./utilities/constants/sessions_db_url");
const db_url = require("./utilities/constants/db_url");
const api = require("./utilities/constants/api");
require('events').EventEmitter.prototype._maxListeners = 1000000;

const PORT = process.env.PORT || 1000; //port

/* create a sessions store*/
const store = new MongoDBStore({uri: sessions_db_url, collection: "sessions"})

// SEVER RUNNING ON ENVIRONMENT PORT OR 1000
const server = app.listen(PORT,()=>{
    console.log("api server running on port "+PORT);
    store.on("open",()=>{
      console.log("session database connection established");
    })
});

server.timeout = 60 * 60 * 1000;
server.keepAliveTimeout = 60 * 60 * 1000;
server.headersTimeout = 60 * 60 * 1000;

// EXPRESS MIDDLEWARE USAGE

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

// create a session 
app.use(session({
  secret: session_secret,
  resave: true,
  saveUninitialized: true,
  unset: 'destroy',
  store: store,
  cookie: {
    secure: false,
    httpOnly: false, 
    maxAge: Date.now() + (30 * 86400 * 1000)
  },
  name: 'session cookie name',
}));
  
/* get logged in user */
app.get("/user_status", (req,res,next)=>{ 
    if(req.session.hasOwnProperty("loggedInUser")){
      const loggedInUser = req.session.loggedInUser;
      const loggedUserName = loggedInUser.username;
      res.send({
        isLoggedIn: true,
        loggedInUser: loggedInUser,
        loggedUserName: loggedUserName
       });
   }
   else{
     res.send({ isLoggedIn: false });
   }
});

app.get("/",(req,res,next)=>{
    if(req.session.hasOwnProperty("loggedInUser")){
        console.log("user logged in");
    }
    else{
        console.log("user logged out");
    }
    res.end();
});  


/* body parser */
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({
  type: function(req) {
      return req.get('content-type').indexOf('multipart/form-data') !== 0;
  },
}));
/* static folder */
app.use(express.static(rootdirectory+static_folder_name));

/* secured headers */
app.use(helmet());

/* express file upload limit */
app.use(expressLimit({
  max :1000,                  // Maximum request per period
  period : 60 * 1000,           // Period in milliseconds
  prefix :'rate-limit-',       // Prefix of the key
  status : 429,                 // Status code in case of rate limit reached
  message : 'Too many requests', // Message in case of rate limit reached
  identifier : request => {         // The identifier function/value of the key (IP by default, could be "req.user.id")
      return request.ip || request.ips; // Read from Default properties
  },
  headers : {                       // Headers names
      remaining: 'X-RateLimit-Remaining',
      reset:     'X-RateLimit-Reset',
      limit:     'X-RateLimit-Limit'
  }             
}));

// REGISTERING ROUTES
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/posts', postsRouter);
app.use("/albums", albumsRouter);
app.use('/activities', activitiesRouter);
app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);
app.use('/genres', genresRouter);
app.use('/likes', likesRouter);
app.use('/playlists', playlistsRouter);
app.use('/replies', repliesRouter);
app.use('/reposts', repostsRouter);
app.use('/uploads', uploadsRouter);
app.use('/downloads', downloadsRouter);
app.use('/lyrics', lyricsRouter);
app.use('/messages', messagesRouter);
app.use('/notifications', notificationsRouter);
app.use('/plays', playsRouter);
app.use('/views', viewsRouter);
app.use('/ratings', ratingsRouter);
app.use('/reviews', reviewsRouter);
app.use('/shares', sharesRouter);
app.use("/account_activation", accountActivation);
app.use("/get_activation_code", getActivationCode);
app.use("/user_following", userFollowing);
app.use("/newsfeed", newsFeed);
app.use("/trash", trashRouter);
app.use("/search", searchRouter);







