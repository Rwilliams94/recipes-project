const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const guestSchema = new Schema ({
    name: String,
    dietaryRequirements: [{type: String, enum: ["vegan", "vegetarian", "glutenFree", "dairyFree"]} ],
});



const GuestModel = mongoose.model("guest", guestSchema);
module.exports = GuestModel;