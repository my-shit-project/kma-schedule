module.exports = function({ sequelize, Sequelize }) {
    let User = sequelize.define('user', {
        uid: {
            type: Sequelize.STRING,
            unique: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        realUID: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    User.sync({ force: process.env.NODE_ENV == 'build' });
    return User;
}
