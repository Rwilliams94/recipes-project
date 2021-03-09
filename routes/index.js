var express = require("express");
var router = express.Router();
const axios = require("axios");
const RecipeModel = require("../models/Recipe.model");

// const URL = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.API_KEY}`; // endpoint here :)

// function getRecipes(URL) {
//   return axios.get(URL);
// }

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home');
// });

// router.get("/recipe", async (req, res, next) => {
//   try {
//     idFinderURL = `https://api.spoonacular.com/recipes/1/information?includeNutrition=false&apiKey=${process.env.API_KEY}`
//     const apiRes = await getRecipes(idFinderURL);
//     let recipes = apiRes.data;

//     console.log(recipes);
//     res.status(200).redirect("home");
//   } catch (err) {
//     next(err);
//   }
// });
const jokeRequest = `https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.apikey4}`;
function getFoodJoke(jokeRequest) {
  return axios.get(jokeRequest);
}

// render homepage with a random food joke (from API) and 3 random recipes (from local DB)
router.get("/", async function (req, res, next) {
  // randomRecipes is an array of 3 objects (recipe documents)
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
