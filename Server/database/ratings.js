const mongoose = require("mongoose");

//rating schema
const ratingSchema = new mongoose.Schema({});


// rating model
const ratingModel = mongoose.model("ratings",ratingSchema,"ratings");
                
module.exports.ratings = {
                 /* GET ALL RATINGS FROM DATABASE*/
                  getRatings: async function(fields=null,limit=100){
                      return await ratingModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE RATING FROM DATABASE*/
                  getRating: async function(ratingId,fields=null){
                    const filterObject = { _id: ratingId };
                    return await ratingModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A RATING TO DATABASE AND RETURN SAVED OBJECT*/
                  addRating: async function(ratingObject){
                    const newRating = new ratingModel(ratingObject);
                    return await newRating.save();
                },
                /* UPDATE A RATING INFO IN DATABASE*/
                  updateRating: async function(ratingId, ratingUpdateObject){
                    const filterObject = { _id: ratingId };
                    const response = await ratingModel.updateOne(filterObject, ratingUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A RATING FROM DATABASE*/
                  deleteRating: async function(ratingId){
                    const filterObject = { _id: ratingId };
                   //delete rating
                   ratingModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}