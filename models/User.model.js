const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema ({
    userName: String, 
    email: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    profileImage: String,
    dietaryRequirements: [{type: String, enum: ["none", "vegan", "vegetarian", "glutenFree", "dairyFree"]} ],
    guests: [{type: Schema.Types.ObjectId, ref: "guests"}],
    registeredGuests: [{type: Schema.Types.ObjectId, ref: "user"}],
    recipesTried: [
        {type: Schema.Types.ObjectId, ref: "recipe"},
        {names: [String]}
    ],
    favouriteRecipes: [{type: Schema.Types.ObjectId, ref: "recipe"}]  // recipe Ids that need to be populated
});



const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;