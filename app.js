require('dotenv').config()
const express = require('express')
const passport=require('passport')
const cookieParser=require("cookie-parser");
const cookieSession = require("cookie-session");
const ejs = require('ejs')
const path = require('path')
const app=express()

app.use(express.json());
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./passport/passportSetup')
require("./DB/connection");
require("./models/schema");
const views_path = path.join(__dirname, "../views");
app.set("view engine", "ejs");
app.set("views", views_path);

app.use(passport.initialize())
app.use(
  cookieSession({
    name: "interactive-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.session())


function loggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/google');
  }
}

app.get('/',(req,res)=>{
    res.render('pages/index')
})

app.get("/google",passport.authenticate('google', { successRedirect: '/',scope:[ 'email', 'profile' ]}));

app.get("/google/callback",passport.authenticate("google", { session:false ,failureRedirect: "/failed" }),
  (req, res) => {
    const getEmail = req.user.emails[0].value;
    const emailDomain = getEmail.split("@");
    if (emailDomain[1] === "akgec.ac.in") 
    {
      // res.redirect('/profile')
      res.redirect("registration");
      console.log('login successful')
      
    } else {
      res.status(422).json({ message: "Invalid User Email,Login with College ID" });
    }
  }
);

app.get("/registeration",loggedIn,(req, res,next) => {
  try {
    res.render("pages/registeration", {
      email: req.user.emails[0].value,
      name: req.user.displayName,
      // pic: req.user.photos[0].value,
    });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong" });
  }
});


app.listen(5000,()=>{
    console.log("server is app")
})