const mongoose = require("mongoose");
const db_url = require("../utilities/constants/db_url");

// make connection function and run query function
module.exports.amalevelz = {
          runQuery: async (query) => {
                 mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true });
                 const db = mongoose.connection;
                 db.on("connection", console.log("connection to database established"));
                 db.on('error', console.error.bind(console, 'connection error:'));
                 db.once('open', function() {
                    query(); // run the query
                 });
          }
}
