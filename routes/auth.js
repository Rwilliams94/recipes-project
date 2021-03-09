const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User.model");

//const uploader = require("./../config/cloudinary");
//const protectAdminRoute = require("./../middlewares/protectAdminRoute");

//GET signin

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

//GET signup

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//GET signout

router.get("/signout", (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});

//POST signin

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await UserModel.findOne({ email: email });

  if (!foundUser) {
    req.flash("error", "You have entered invalid credentials");
    // res.render('auth/signin', {errorMessage: 'Invalid credentials'})
    res.redirect("/auth/signin");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);

    if (!isSamePassword) {
      req.flash("error", "You have entered invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const userObject = foundUser.toObject();
      delete userObject.password;

      req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
      req.flash("success", "Successfully logged in...");
      // res.locals.currentUser = req.session.currentUser;
      // res.locals.isLoggedIn = true;
      res.redirect("/");
      // res.redirect("auth/userpage", {user: req.session.currentUser})
    }
  }
});

//POST signup

router.post("/signup", async (req, res, next) => {
  const newUser = { ...req.body };
  const foundUser = await UserModel.findOne({ email: newUser.email });

  if (foundUser) {
    res.render("auth/signup", { error: "Email already registered" });
    // req.flash("warning", "Email already registered");
    // res.redirect("/auth/signup");
  } else {
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashedPassword;
    UserModel.create(newUser);
    res.render("auth/signin", {
      errorMessage: "Congrats ! You are now registered !",
    });
    // req.flash("success", "Congrats ! You are now registered !");
    // res.redirect("/auth/signin");
  }
});

module.exports = router;
