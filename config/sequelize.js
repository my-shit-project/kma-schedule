const Sequelize = require("sequelize");
const config = require("./")
module.exports = new Sequelize(Object.assign(config.sequelize || {}, {
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: process.env.NODE_ENV == 'development' ? console.log : false,

    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: true
    },
    sync: { force: false },

}))
