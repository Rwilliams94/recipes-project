const express = require("express");
const router = express.Router();
const GuestModel = require("./../models/guest.model");


// Find guest collection
router.get("/guests/", async (req, res, next) => {
    try {
      const guests = await GuestModel.find();
      console.log(guests);
      res.render("guests_list", {guests});
  
    } catch (err) {
      next(err);
    }
  });


// Create new guest
router.post ("/guest_add", async (req, res, next) => {
    const { name, dietaryRequirements } = req.body;
    
    try {
        await GuestModel.create({
          name,
          dietaryRequirements
        });
    } catch (err) {
        next(err);
    }
    res.redirect('/users');
  });


// Updating the guests
router.get("", async (req, res, next) => {
    try {
      res.render("", await GuestModel.findById(req.params.id));
    } catch (err) {
      next(err);
    }
  });



// Update guest
router.post("/:id",
  async (req, res, next) => {
    try {
      const guestToUpdate = { ...req.body };

      await GuestModel.findByIdAndUpdate(req.params.id, guestToUpdate);
      res.redirect("");
    } catch (err) {
      next(err);
    }
  }
);


// find guest with id
router.get("/:id",
  async (req, res, next) => {
    try {
      const oneGuest = await GuestModel.findByIdAndUpdate(req.params.id);
      res.render("", {guest : oneGuest});
    } catch (err) {
      next(err);
    }
  }
);

// find guest by id and remove it
router.get("", async (req, res, next) => {
    try {
      await GuestModel.findByIdAndRemove(req.params.id);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  });


  module.exports = router;