require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates

// base dependencies

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const dev_mode = false;

const app = express();
// config logger (for debug)

app.use(logger("dev"));

// initial config

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(path.join(__dirname + "/views/partial"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

//SESSION SETUP

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      //sameSite: "none",
      httpOnly: true,
      maxAge: 600000, // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 60 * 60 * 24,
    }),
  })
);
// flash messages

app.use(flash());


//custom middlewares

if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // active le mode dev pour éviter les deconnexions
  app.use(require("./middlewares/debugSessionInfos")); // affiche le contenu de la session
}

app.use(require("./middlewares/exposeLoginStatus")); // expose le status de connexion aux templates
app.use(require("./middlewares/exposeFlashMessage")); // affiche les messages dans le template

// router set up

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const recipesRouter = require("./routes/recipes");
const apiSearchRouter = require("./routes/api.recipes")
const mealPlanRouter = require("./routes/mealplan");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use('/mealplan', mealPlanRouter)
app.use('/api/recipes', apiSearchRouter);

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
// app.locals.site_url = process.env.SITE_URL;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
