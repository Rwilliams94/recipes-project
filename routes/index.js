var express = require("express");
var router = express.Router();
const axios = require("axios");
const RecipeModel = require("../models/Recipe.model");
const UserModel = require("../models/User.model");

const jokeRequest = `https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.apikey4}`;
function getFoodJoke(jokeRequest) {
  return axios.get(jokeRequest);
}


// router.get("/", async function (req, res, next) {res.render("home")})

// render homepage with a random food joke (from API) and 3 random recipes (from local DB)
router.get("/", async function (req, res, next) {
  //randomRecipes is an array of 3 objects (recipe documents)
  // console.log(req.session.currentUser._id)
 
  try {
    const randomRecipes = await RecipeModel.aggregate([{ $sample: { size: 3 } }]);
    const apiRes = await getFoodJoke(jokeRequest);
    const foodJoke = apiRes.data.text;
    console.log(foodJoke);
    res.render("home", {randomRecipes, foodJoke});
  } catch (err) {
    next(err);
  }
});


module.exports = router;
