var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");

// landing page: search tool and list of recipes
router.get("/", (req, res, next) => {
  RecipeModel.find()
    .sort("title")
    .then((recipes) => res.render("recipes/recipes-home", { recipes, js:"recipes-home", css:"recipes-home" }))
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
    .then((recipes) => res.render("recipes/recipes-home", { recipes, js:"recipes-home", css:"recipes-home" }))
    .catch(next);
});

// details on selected recipe
router.get("/:id", (req, res, next) => {
  RecipeModel.findById(req.params.id)
    .then((recipe) =>
      res.render("recipes/recipe-detail", {
        recipe,
        title: "Recipe details",
        js: "recipe-detail",
      })
    )
    .catch(next);
});

module.exports = router;
