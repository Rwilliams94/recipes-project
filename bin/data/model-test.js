

let Recipe = {
    title: String,
    readyInMinutes: Number,
    servings: Number,
    vegetarian: Boolean,
    vegan: Boolean,
    glutenFree: Boolean,
    dairyFree: Boolean,
    cheap: Boolean,
    pricePerServing: Number,
    extendedIngredients: [{name: String, amount: Number, unit:String}],
    sourceUrl: String,
    image: String,
    summary: String,
    cuisines: [String],
    dishTypes: [String],
    diets: [String],
    occasions: [String],
    instructions: String,
  }

let User = {
    userName: String, 
    email: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    profileImage: String, 
    dietaryRequirements: [{type: String, enum: ["vegan", "Vegetarian", "glutenFree", "dairyFree"]} ],
    guests: [{type: ObjectId, ref: "guests"}],
    registeredGuests: [{type: ObjectId, ref: "users"}],
    recipesTried: [{recipes: {type: ObjectId, ref: "recipes"}, names: [String]}],
    favouriteRecipes: [{type: ObjectId, ref: "recipes"}],  // recipe Ids that need to be populated
}

let guest = {
    name: String,
    dietaryRequirements: [{type: String, enum: ["vegan", "Vegetarian", "glutenFree", "dairyFree"]} ],
}

let review = {
    user: [{type: ObjectId, ref: "users"}],
    recipe: [{type: ObjectId, ref: "recipes"}],
    comment: String, 
    stars: Number
}

// signed in users can save favourite recipes and add guests.
// non-signed in users can only search recipes.
