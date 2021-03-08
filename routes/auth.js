const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require("./../models/User.model");
//const uploader = require("./../config/cloudinary");
//const protectAdminRoute = require("./../middlewares/protectAdminRoute");


//GET signin

router.get("/signin", (req,res, next)=>{
    console.log("session ====>", req.session);
    res.render('auth/signin');

});

//GET signup

router.get("/signup", (req,res, next)=>{

    res.render('auth/signup');

});

//GET signout

router.get( "/signout", (req, res, next)=> { 
 req.session.destroy(function (err)
 {
     res.redirect("/auth/signin");
 });
});


//POST signin

router.post("/signin", async (req, res, next)=>{
    try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne({ email: email });
  
        if (!foundUser) {
            console.log("wrong email");
        // req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
        } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);
        
                if (!isSamePassword) {
                    console.log("wrong password");
                    // req.flash("error", "Invalid credentials");
                    res.redirect("/auth/signin");
                } else {
                    console.log("correct");
                    const userObject = foundUser.toObject();
                    delete userObject.password; 
                    // console.log(req.session, "before defining current user");
                    req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
                    // req.flash("success", "Successfully logged in...");
                    res.redirect("/").render("/", {userInSession: req.session.currentUser})
                    
                }
        }
    } catch (err) {
        let errorMessage = "";
        for (field in err.errors) {
            errorMessage += err.errors[field].message + "\n";
        } 
        // req.flash("error", errorMessage);
        res.redirect("/auth/signup");
    }

});
    

//POST signup

router.post("/signup", async (req, res, next)=>{
    
    const newUser  = {...req.body}
    console.log(newUser)
    
    try {
    
    const newUser  = {...req.body};
    const foundUser = await UserModel.findOne({email:newUser.email})

        if (foundUser) {
            // req.flash("warning", "Email already registered");
            res.redirect("/signup");
        } else {
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            newUser.password = hashedPassword;
            UserModel.create(newUser);
            // req.flash("success", "Congrats ! You are now registered !");
            res.redirect("/signin");
        } 

    }catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
        errorMessage += err.errors[field].message + "\n";
    } 
    // req.flash("error", errorMessage);
    res.redirect("/signup");
  }

});



module.exports = router;
