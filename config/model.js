const Sequelize = require("sequelize");

module.exports = function({ sequelize }) {
    return {
        model: {
            user: require("./sequelize/user")({ sequelize, Sequelize }),
            schedule: require("./sequelize/schedule")({ sequelize, Sequelize }),
            describe: require("./sequelize/describe")({ sequelize, Sequelize })
        },
        use: function(modelName) {
            return this.model[`${modelName}`];
        }
    }
}
