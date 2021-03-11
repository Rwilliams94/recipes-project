const express = require("express");
const router = new express.Router();
const RecipeModel = require("./../models/Recipe.model.js");

router.get("/", async (req, res, next) => {
  let query = {};

  if (req.query.name) {
    const exp = new RegExp(req.query.name);
    query.name = { $regex: exp };
    console.log(query.name);
  }

  try {
    const searchRes = await RecipeModel.find({ title: query.name });
    // searchRes.forEach(res => console.log("the back end ===>", res.title))
    res.json(searchRes);
  } catch (err) {
    console.log(err);
  }
});

router.get("/results", async (req, res, next) => {
  console.log("req.query: ", req.query);

  let arr = [];
  let search = {};

  if (req.query.gluten) search.glutenFree = true;
  if (req.query.dairy) search.dairyFree = true;
  if (req.query.vegan) search.vegan = true;
  if (req.query.vegetarian) search.vegetarian = true;

  if (req.query.ingredient1 || req.query.ingredient2 || req.query.ingredient3) search.$and= arr ;
  if (req.query.ingredient1)
    arr.push({
      "extendedIngredients.name": {
        $regex: req.query.ingredient1,
        $options: "i",
      },
    });
  if (req.query.ingredient2)
    arr.push({
      "extendedIngredients.name": {
        $regex: req.query.ingredient2,
        $options: "i",
      },
    });
  if (req.query.ingredient3)
    arr.push({
      "extendedIngredients.name": {
        $regex: req.query.ingredient3,
        $options: "i",
      },
    });

  if (req.query) {
    try {
      const searchRes = await RecipeModel.find(search);
      res.json(searchRes);
      console.log("number of recipes found: ", searchRes.length);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
