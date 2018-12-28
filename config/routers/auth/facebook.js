const router = require("express").Router();
module.exports = function({ passport, model }) {
    let pauth = passport.authenticate.bind(passport);
    router.get('/', pauth('facebook', { scope: ['email', 'public_profile'] }));
    router.get('/callback', pauth('facebook', { failureRedirect: '/', successRedirect: '/' }));
    return router;
}
