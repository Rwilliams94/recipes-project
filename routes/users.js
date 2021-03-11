var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");
const UserModel = require("./../models/User.model");
const uploader = require("./../config/cloudinary");
const RecipeModel = require("./../models/Recipe.model");


//-------------------Profile--------------------
//--------------------Users--------------------

router.get("/", async (req, res, next) => {
 try{
    const user = await UserModel.findById(req.session.currentUser._id).populate("guests recipe");
    
    res.render("users", {guests: user.guests, userName: user.userName, diet: user.dietaryRequirements, favRecip : user.favouriteRecipes, img : user.profileImage, id : user._id});
  }
  catch(error) {
    next(error);
  }
});


//any guest added goes to user.guests
router.post("/guestUpdate/:id", (req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(() => {
    res.redirect("/users");
  })
  .catch((error)=> {
    next(error);
  });
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

    
router.post("/profileUpdate/:id", (req, res, next) => {
  const { userName, dietaryRequirements, profileImage } = req.body;
  UserModel.findByIdAndUpdate({_id:req.params.id}, {
    userName,
    dietaryRequirements,
    profileImage
  })
  .then(() => {
    res.redirect("/users");
  })
  .catch((error)=> {
    next(error);
  });
});


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

    
router.post("/guestUpdate/:id", (req, res, next) => {
  console.log("++++++++++++++++++++++++++",req.params.id);
  GuestModel.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true})
  .then(() => {
    res.redirect("/users");
  })
  .catch((error)=> {
    next(error);
  });
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