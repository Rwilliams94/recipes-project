var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");

//-------------Users-------------

router.get('/', (req, res, next) => {res.render('users')})


//-------------------GUESTS--------------------

// Guests list
router.get("/", (req, res, next) => {
  GuestModel.find()
  .then(guests => {
    res.render("users", {guests});
  })
  .catch((error) => {
    next(error);
  });
});


// ----------------Create new guest------------------
router.get("/guest", (req, res) => {
  res.render("guests/guestAdd");
});

router.post("/guestAdd", (req, res, next) => {
  const { name, dietaryRequirements } = req.body;
  GuestModel.create(req.body)
  .then(guest => {
    console.log(guest);
    res.redirect("/users");
  })
  .catch((error) => {
    next(error);
  });
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
  GuestModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
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