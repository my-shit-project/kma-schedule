require('dotenv').config();

const app = require("express")();
const passport = require("passport");
const sequelize = require("./config/sequelize");
const model = require("./config/model")({ sequelize });
require('./config/express')({ app, passport });
require('./config/passport')({ passport , model});
require('./config/router')({ app, passport , model});
sequelize
    .authenticate()
    .then(() => {
        
    })
    .then(listen)
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

function listen() {
    let { PORT = 80 } = process.env;
    app.listen(PORT, () => console.log(`Listen in port ${PORT}`));
}
