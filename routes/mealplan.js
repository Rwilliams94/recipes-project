var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");
const UserModel = require("./../models/User.model");



router.get("/", async (req, res, next) => {
  
    try{
       const user = await UserModel.findById(req.session.currentUser._id).populate("guests");
       res.render("meal-plan", {user});
     }
     catch(error) {
       next(error);
     }
   });


module.exports = router;