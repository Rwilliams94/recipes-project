const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rmtwilliams94:Ironhack2021@cluster0.0bmpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", () => console.log("nay db error sorry :("));

