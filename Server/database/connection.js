const mongoose = require("mongoose");
const db_url = require("../utilities/constants/db_url");


// make connection function and run query function
module.exports.amalevelz = {
          runQuery: (query) => {
                        if(mongoose.connections.length < 2){
                              mongoose.connect(db_url, {useNewUrlParser: true, poolSize: 1000, useUnifiedTopology: true });
                        }
                         const db = mongoose.connection;
                         query();
                         db.on('error', console.error.bind(console, 'connection error:'));
                         db.on('open', function() {
                               // const qry = await
                                  // run the query
                                //db.close();
                                
                              // if(mongoose.connections.length > 2){
                              //      await db.close();
                              // }
                         });
                         // db.on("close",()=>{
                         // mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true });
                         // });
                         process.on('SIGINT', function(){
                         mongoose.connection.close(function(){
                         console.log("Mongoose default connection is disconnected due to application termination");
                         process.exit(0);
                         });
                     });
              //   }
        }
}
