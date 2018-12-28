const router = require("express").Router();
module.exports = function({ passport }) {
    router.get('/', function(req, res) {
        if (req.isAuthenticated()) return res.render('update', { user: req.user || {} });
        return res.redirect('/')
    })
    return router;
}
