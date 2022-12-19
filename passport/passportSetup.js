const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
var userProfile;
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    userProfileUrl:'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback:true
},
function(req,accessToken,refreshToken,profile,done){
    var userProfile=profile;
    console.log(profile)
    return done(null,profile)
}
))

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });