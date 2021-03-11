var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");
const UserModel = require("./../models/User.model");
const RecipeModel = require("./../models/Recipe.model");





router.get("/", async (req, res, next) => {
  
    try{
       const user = await UserModel.findById(req.session.currentUser._id).populate("guests");
       res.render("meal-plan", {user, css: "meal-planner"});
     }
     catch(error) {
       next(error);
     }
   });


module.exports = router;


router.post("/", async (req, res, next) => {

  try {
  const user = await UserModel.findById(req.session.currentUser._id).populate("guests");
  const recipes = await RecipeModel.find({
    $and: [
      test,
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
  
  res.render("meal-plan", { user, recipes, js:"meal-plan", css:"meal-plan" })

  } catch (err) {
    next(err)}
});