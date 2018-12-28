const router = require("express").Router();
module.exports = function({ passport }) {
    router.get('/', function(req, res) {
        req.logOut();
        req.session.destroy();
        res.redirect('/');
    })
    return router;
}
