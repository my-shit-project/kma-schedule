//Declare strategies
const facebook = require("./passport/facebook");

module.exports = function({ passport, model }) {
    let User = model.use('user');
    let Describe = model.use('describe');
    //Serialize session
    passport.serializeUser(async function(userSerial, callback) {
        let [user, created] = await User.findOrCreate({ where: { uid: userSerial.id.toString() }, defaults: { name: userSerial.displayName, email: userSerial._json.email } });
        if (!created) await user.update({ name: userSerial.displayName, email: userSerial._json.email }, { where: { uid: userSerial.id.toString() } })

        return callback(null, userSerial)
    })
    //Deserialize it
    passport.deserializeUser(async function(user, callback) {
        let describeUser = await Describe.findOne({ where: { uid: user.id } });
        let { studentCode, studentName } = (describeUser && describeUser.get({ plain: true })) || {};

        return callback(null, { id: user.id, displayName: user.displayName, email: user._json.email, avatarUrl: user.photos[0].value, studentCode, studentName })
    })

    //Use strategies
    passport.use(facebook);
}
