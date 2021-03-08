const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Schema for the guests
const guestSchema = new Schema ({
    name: String,
    dietaryRequirements: [{type: String, enum: ["vegan", "vegetarian", "glutenFree", "dairyFree"]} ],
});


// Export the guests schema
const GuestModel = mongoose.model("guest", guestSchema);
module.exports = GuestModel;