const mongoose = require("mongoose");
const db_url = require("../utilities/constants/db_url");

// make connection function and run query function
module.exports.amalevelz = {
          runQuery: (query) => {
                 mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true });
                 const db = mongoose.connection;
                 db.on('error', console.error.bind(console, 'connection error:'));
                 db.once('open', async function() {
                    const queryResult = await query(); // run the query
                    if(queryResult){db.close()}
                 });
                 process.on('SIGINT', function(){
                  mongoose.connection.close(function(){
                    console.log("Mongoose default connection is disconnected due to application termination");
                     process.exit(0);
                    });
                 });
          }
}
