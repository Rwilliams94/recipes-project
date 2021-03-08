const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Schema for the reviews
const reviewSchema = new Schema ({
    user: [{type: Schema.Types.ObjectId, ref: "user"}],
    recipe: [{type: Schema.Types.ObjectId, ref: "recipe"}],
    comment: String, 
    stars: Number
});

// Export the reviews schema
const ReviewModel = mongoose.model("review", reviewSchema);
module.exports = ReviewModel;