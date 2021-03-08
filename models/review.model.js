const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const reviewSchema = new Schema ({
    user: [{type: Schema.Types.ObjectId, ref: "user"}],
    recipe: [{type: Schema.Types.ObjectId, ref: "recipe"}],
    comment: String, 
    stars: Number
});


const ReviewModel = mongoose.model("review", reviewSchema);
module.exports = ReviewModel;