var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");

// landing page: search tool and list of recipes
router.get("/", (req, res, next) => {
  RecipeModel.find()
    .sort("title")
    .then((recipes) => res.render("recipes/recipes-home", { recipes }))
    .catch(next);
});

// search by ingredients
router.post("/", (req, res, next) => {
  RecipeModel.find({
    $and: [
      {
        "extendedIngredients.name": {
          $regex: req.body.ingredient1,
          $options: "i",
        },
      },
      {
        "extendedIngredients.name": {
          $regex: req.body.ingredient2,
          $options: "i",
        },
      },
      {
        "extendedIngredients.name": {
          $regex: req.body.ingredient3,
          $options: "i",
        },
      },
    ],
  })
    .sort("title")
    .then((recipes) => res.render("recipes/recipes-home", { recipes }))
    .catch(next);
});

// details on selected recipe
router.get("/:id", (req, res, next) => {
  RecipeModel.findById(req.params.id)
    .then((recipe) => res.render("recipes/recipe-detail", { recipe }))
    .catch(next);
});

module.exports = router;
