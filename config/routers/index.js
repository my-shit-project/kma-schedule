const router = require("express").Router();
module.exports = function({ passport, model }) {
    let scheduleHelper = require("../../app/function/schedule")({ model });
    router.get('/', async function(req, res) {
        if (!req.isAuthenticated()) return res.render('login');
        else {
            let schedule = await scheduleHelper.search({ date: scheduleHelper.getDateNow(), id: req.user.id });
            return res.render('index', { user: req.user, schedule, noti: req.query.noti || '' });
        }
    })
    return router;
}
