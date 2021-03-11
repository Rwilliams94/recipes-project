var express = require("express");
var router = express.Router();
const RecipeModel = require("./../models/Recipe.model");
const UserModel = require("./../models/User.model");

// landing page: search tool and list of recipes
router.get("/", (req, res, next) => {
  RecipeModel.find()
    .sort("title")
    .then((recipes) => res.render("recipes/recipes-home", { recipes, js:"recipes-home", css:"recipes-home" }))
    .catch(next);
});






// search by ingredients


// details on selected recipe
router.get("/:id", async (req, res, next) => {
  try {
   const recipe = await RecipeModel.findById(req.params.id)
   let favCheck
   if(res.locals.isLoggedIn) {
    const user = await UserModel.findById(req.session.currentUser);
    const favCheck = user.favouriteRecipes.includes(req.params.id);
   }
      res.render("recipes/recipe-detail", {
        recipe,
        title: "Recipe details",
        js: "recipe-detail",
        favCheck
      })
    
  } catch(err) {
    next(err)
  }
});


  router.get("/delete/:id", (req, res, next) => {
    RecipeModel.findByIdAndDelete(req.params.id)
    .then(res.redirect("/recipes"))
    .catch(next);
})



module.exports = router;
