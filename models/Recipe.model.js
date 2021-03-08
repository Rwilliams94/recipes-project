const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const recipeSchema = new Schema ({
    title: String,
    readyInMinutes: Number,
    servings: Number,
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    dairyFree: Boolean,
    cheap: Boolean,
    pricePerServing: Number,
    extendedIngredients: [{ 
        name: String,
        amount: Number,
        unit:String
    }],
    sourceUrl: String,
    image: String,
    summary: String,
    cuisines: [String],
    dishTypes: [String],
    diets: [String],
    winePairing: {pairingText: String}, 
    occasions: [String],
    instructions: String,    
});



const RecipeModel = mongoose.model("recipe", recipeSchema);
module.exports = RecipeModel;