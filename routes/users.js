var express = require("express");
var router = express.Router();
const GuestModel = require("./../models/guest.model");

router.get('/', (req, res, next) => {res.render('users')})


//------------GUESTS--------------

// Guests list
router.get("/", (req, res, next) => {
  SneakerModel.find()
  .then(guests => {
      res.render("guests/guestList", {guests});
  })
  .catch(err=>console.error(err));
});


// Create new guest
router.get("/guest", (req, res) => {
  res.render("guests/guestAdd");
});

router.post("/guestAdd", (req, res, next) => {
  const { name, dietaryRequirements } = req.body;
  GuestModel.create(req.body)
  .then(() => {
    res.redirect("/");
  })
  .catch((error) => {
    next(error);
  });
});



// Update guest
router.get('/users/:id', (req, res) => {

  GuestModel.findById(req.params.id)

      .then(style => {
          res.render('users/guestUpdate', {style});
      })
      .catch(error => {
          console.log(error);
      });
  });




module.exports = router;