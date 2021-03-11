const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Schema for the users
const userSchema = new Schema ({
    userName: String, 
    email: {
        type:String,
        required: true,
        unique:true,
        validate: (email) => {
            return Boolean(
              email.match(
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
              )
            );
        }
    },
    password: {type:String, required: true},
    profileImage: {type : String, default : "https://res.cloudinary.com/adgranmous/image/upload/v1615381527/defaut-picture_c0qi4a.png"},
    dietaryRequirements: [{type: String, enum: ["none", "vegan", "vegetarian", "glutenFree", "dairyFree"]} ],
    guests: [{type: Schema.Types.ObjectId, ref: "guests"}],
    registeredGuests: [{type: Schema.Types.ObjectId, ref: "user"}],
    recipesTried: [
        // {type: Schema.Types.ObjectId, ref: "recipe"},
        {names: [String]}
    ],
    favouriteRecipes: [{type: Schema.Types.ObjectId, ref: "recipe"}]  // recipe Ids that need to be populated
});


// Export the users schema
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;