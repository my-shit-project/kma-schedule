const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("../");
module.exports = new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: `${config.urlWeb}/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
},function(accessToken, refreshToken, profile, done){
    // console.log(profile)
    return done(null, profile)
})
