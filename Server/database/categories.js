const mongoose = require("mongoose");

//category schema
const categorySchema = new mongoose.Schema({
		category_name: String,
		Link_name: String,
		numberOfposts: Number,
		category_thumnail: String,
});


// category model
const categoryModel = mongoose.model("categories",categorySchema,"categories");
                
module.exports.categories = {
                 /* GET ALL CATEGORIES FROM DATABASE*/
                  getCategories: async function(fields=null,limit=100){
                      return await categoryModel.find({},fields,function (err, docs) {
                          if (err){
                              throw err;
                          }
                          return docs;
                       }).limit(limit);

                  },
                  /* GET ONE CATEGORIES FROM DATABASE*/
                  getCategory: async function(categoryId,fields=null){
                    const filterObject = { _id: categoryId };
                    return await categoryModel.findOne(filterObject, fields, function (err, doc) {
                        if (err){
                            throw err;
                        }
                        return doc;
                     })

                },
                /* ADD A CATEGORY TO DATABASE AND RETURN SAVED OBJECT*/
                  addCategory: async function(categoryObject){
                    const newCategory = new categoryModel(categoryObject);
                    return await newCategory.save();
                },
                /* UPDATE A CATEGORY INFO IN DATABASE*/
                  updateCategory: async function(categoryId, categoryUpdateObject){
                    const filterObject = { _id: categoryId };
                    const response = await categoryModel.updateOne(filterObject, categoryUpdateObject);
                    const updated = { updated: response.n };
                    return updated;
                },
                /* DELETE A CATEGORY FROM DATABASE*/
                  deleteCategory: async function(categoryId){
                    const filterObject = { _id: categoryId };
                   //delete category
                   categoryModel.deleteOne(filterObject, function (err) { if(err) { throw err } return; } );

                } 
}