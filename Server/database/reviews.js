const mongoose = require("mongoose");

//review schema
const reviewSchema = new mongoose.Schema({});


// review model
const reviewModel = mongoose.model("reviews",reviewSchema,"reviews");
                
module.exports.reviews = {
                 /* GET ALL REVIEWS FROM DATABASE*/
                  getReviews: async function(fields=null,limit=100){
                      return await reviewModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE REVIEW FROM DATABASE*/
                  getReview: async function(reviewId,fields=null){
                    const filterObject = { _id: reviewId };
                    return await reviewModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A REVIEW TO DATABASE AND RETURN SAVED OBJECT*/
                  addReview: async function(reviewObject){
                    const newReview = new reviewModel(reviewObject);
                    return await newReview.save();
                },
                /* UPDATE A REVIEW INFO IN DATABASE*/
                  updateReview: async function(reviewId, reviewUpdateObject){
                    const filterObject = { _id: reviewId };
                    const response = await reviewModel.updateOne(filterObject, reviewUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A REVIEW FROM DATABASE*/
                  deleteReview: async function(reviewId){
                    const filterObject = { _id: reviewId };
                   //delete review
                   reviewModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}