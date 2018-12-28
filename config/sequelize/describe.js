module.exports = function({ sequelize, Sequelize }) {
    let Describe = sequelize.define('describer', {
        uid: {
            type: Sequelize.STRING,
            unique: true
        },
        studentCode: Sequelize.STRING,
        studentName: Sequelize.STRING
    });

    Describe.sync({ force: process.env.NODE_ENV == 'build' });
    return Describe;
}
