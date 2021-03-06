// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const axios = require("axios");
const RecipeModel = require("./../../models/Recipe.model"); // fetch the model to validate our user document before insertion (in database)

// const URL = `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${process.env.API_KEY}`; // endpoint here :)


API_KEY= "3c77e62d90d04a6587e94dba83509eba"
API_KEY1= "7988f333580e414fb99aa98ee251dfee"
API_KEY2= "a1854d8e765d4cd5ae6b73760b737be2"
// API_KEY3= "2431adb3432a439fb99d8e84f8a53a9b"

let id = 131421;

function getRecipes(URL) {
  return axios.get(URL);
}



async function insertRecipes() {
  try { 
    let idFinderURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY2}`
    const apiRes = await getRecipes(idFinderURL)
    let recipe = apiRes.data
    // console.log(recipe);
    const inserted = await RecipeModel.insertMany(recipe); // insert docs in db
    console.log(`seed recipes done : ${inserted.length} documents inserted !`);
    
    console.log(id);
  } catch (err) {
    console.log("not at this ID");
  }
};


let intervalId = setInterval(() => {
  insertRecipes()
  id+=75
}, 250);

setTimeout(() => {
  clearInterval(intervalId)
  console.log("done");
}, 40000);