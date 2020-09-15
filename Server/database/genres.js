const mongoose = require("mongoose");

//genre schema
const genreSchema = new mongoose.Schema({
			genre_name: String,
			Link_name: String,
			numberOfposts: Number,
			genre_thumnail: String,	
});


// user model
const genreModel = mongoose.model("genres",genreSchema,"genres");
                
module.exports.genres = {
                 /* GET ALL GENRES FROM DATABASE*/
                  getGenres: async function(fields=null,limit=100){
                      return await genreModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE GENRES FROM DATABASE*/
                  getGenre: async function(genreId,fields=null){
                    const filterObject = { _id: genreId };
                    return await genreModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A GENRE TO DATABASE AND RETURN SAVED OBJECT*/
                  addGenre: async function(genreObject){
                    const newGenre = new genreModel(genreObject);
                    return await newGenre.save();
                },
                /* UPDATE A GENRE INFO IN DATABASE*/
                  updateGenre: async function(genreId, genreUpdateObject){
                    const filterObject = { _id: genreId };
                    const response = await genreModel.updateOne(filterObject, genreUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A GENRE FROM DATABASE*/
                  deleteGenre: async function(genreId){
                    const filterObject = { _id: genreId };
                   //delete user
                   genreModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}