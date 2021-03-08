var express = require('express');
var router = express.Router();
const axios = require("axios");

const URL = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.API_KEY}`; // endpoint here :)



// function getRecipes(URL) {
//   return axios.get(URL);
// }

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    idFinderURL = `https://api.spoonacular.com/recipes/1/information?includeNutrition=false&apiKey=${process.env.API_KEY}`
    const apiRes = await getRecipes(idFinderURL);
    let recipes = apiRes.data;
        
    console.log(recipes);
    res.status(200).render("index", { recipes: recipes});
  } catch (err) {
    next(err);
  }
});

module.exports = router;



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
