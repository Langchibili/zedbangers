const mongoose = require("mongoose");
const db_url = require("../utilities/constants/trash_db_url");

// make connection function and run query function
module.exports.amalevelz = {
          runQuery: async (query) => {
                 const trashConnection = mongoose.createConnection(db_url, {useNewUrlParser: true, useUnifiedTopology: true })
                 trashConnection.on('error', console.error.bind(console, 'connection error:'));
                 trashConnection.once('open', async function() {
                    await query(); // run the query
                    await trashConnection.close();
                 });
          }
}