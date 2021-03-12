var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");
const UserModel = require("./../models/User.model");
const fileUploader = require("./../config/cloudinary");
const RecipeModel = require("./../models/Recipe.model");


//-------------------Profile--------------------
//--------------------Users--------------------

router.get("/", async (req, res, next) => {
 try{
    const user = await UserModel.findById(req.session.currentUser._id).populate("guests").populate("favouriteRecipes");
    res.render("users", {css: "profile", guests: user.guests, userName: user.userName, diet: user.dietaryRequirements, favRecip : user.favouriteRecipes, img : user.profileImage, id : user._id});
  }
  catch(error) {
    next(error);
  }
});




// updating profile infos

router.get("/profileUpdate/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
  .then((user) => {
    res.render("profile/profileUpdate", {user} );
  })
  .catch((dbError) => {
    next(dbError);
  });
});

    
router.post("/profileUpdate/:id", fileUploader.single("profileImage"), async (req, res, next) => {
  try {

  const updateUser = {...req.body};
    if (!req.file) {updateUser.profileImage = "https://res.cloudinary.com/adgranmous/image/upload/v1615381527/defaut-picture_c0qi4a.png"
    } else {updateUser.profileImage = req.file.path}

  const user = await UserModel.findByIdAndUpdate(req.params.id, updateUser, {new: true})
  console.log(user);
  res.redirect("/users");
  
  }catch (error) {
    next(error);
  };
});



//---------------------RECIPES----------------------

//------------ add favourite recipe ----------------

router.get("/favRecipe/:id", async (req, res, next) => {
  
  const recipeId = req.params.id; 
  console.log(recipeId)
  console.log(req.session.currentUser._id);
  const user = await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$push : {favouriteRecipes: recipeId}}, {"new": true});
  res.redirect(`/recipes/${recipeId}`);
  console.log(user);  
});

router.get("/favRecipeDelete/:id", async (req, res, next) => {
  
  const recipeId = req.params.id; 
  console.log(recipeId);
  console.log(req.session.currentUser._id);
  const user = await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$pull : {favouriteRecipes: recipeId}}, {"new": true});
  res.redirect(`/recipes/${recipeId}`);
  console.log(user);  
});


// favouriteRecipes: [{type: Schema.Types.ObjectId, ref: "recipe"}
//---------------------GUESTS----------------------


// ----------------Create new guest------------------

router.get("/guest", (req, res) => {
  res.render("guests/guestAdd");
});

// create and update guest depending on the user
router.post("/guestAdd", async (req, res, next) => {
  const { name, dietaryRequirements } = req.body;
  const guest = await GuestModel.create(req.body);
  let guestId = guest._id;
 const user = await UserModel.findByIdAndUpdate(req.session.currentUser._id, {$push : {guests: guest._id}}, {"new": true});
 res.redirect("/users");
console.log(user);  
});


// ---------------Update guest-------------------

router.get("/guestUpdate/:id", (req, res, next) => {
  GuestModel.findById(req.params.id)
  .then((guest) => {
    res.render("guests/guestUpdate", {guest} );
  })
  .catch((dbError) => {
    next(dbError);
  });
});


router.post("/guestUpdate/:id", async (req, res, next) => {
  try {  
  const updateGuest = {...req.body};
  console.log(updateGuest)
  const guest = await GuestModel.findByIdAndUpdate(req.params.id, updateGuest, {new:true})
  console.log(guest);
  res.redirect("/users");
  
  }catch (error) {
    next(error);
  };
});

//----------------Delete guest---------------------

router.get('/delete/:id', (req, res, next) => {
  GuestModel.findByIdAndDelete(req.params.id)
  .then(()=> {
    res.redirect("/users");
  })
  .catch((error) => {
    next(error);
  });
});





module.exports = router; 