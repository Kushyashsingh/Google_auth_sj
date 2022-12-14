require('dotenv').config()
const express = require('express')
const passport=require('passport')
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
// var session = require('express-session')
// const cookieSession=require('cookie-session')

const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())


// app.use(cookieSession({
//   name:'tuto-session',
//   keys:['key1','key2']
// }))

require('./passport/passportSetup')
require("./DB/connection");
require("./models/schema");
app.set("view engine", "ejs");

function loggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/google');
  }
}

// app.use(session({
//   key:'yash',
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true,
//   expires: 600000 }
// }))


app.get('/',(req,res)=>{
    res.render('pages/index')
})

app.get("/registration",loggedIn,(req, res,next) => {
  try {
    res.render("registration", {
      email: req.user.emails[0].value,
      name: req.user.displayName,
      pic: req.user.photos[0].value,
    });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong" });
  }
});

app.get("/google",passport.authenticate('google',{scope:['profile','email']}));

app.get("/google/callback",passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    const getEmail = req.user.emails[0].value;
    const emailDomain = getEmail.split("@");

    if (emailDomain[1] === "akgec.ac.in") 
    {
      res.redirect("/registration");
    } else {
      res.status(422).json({ message: "Invalid User Email,Login with College ID" });
    }
  }
);

app.listen(5000,()=>{
    console.log("server is app")
})