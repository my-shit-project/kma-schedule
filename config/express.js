const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = function({ app, passport }) {
    //Set folder static
    app.use(express.static('public'));
    //Set view engine
    app.set('view engine', 'ejs');
    app.set('views', './app/view');
    //Use body parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //Use Cookie parser
    app.use(cookieParser());
    //Use express cookie middleware
    app.use(session({
        secret: 'meow',
        resave: true,
        saveUninitialized: true
    }))
    //Use passport
    app.use(passport.initialize());
    app.use(passport.session());
    
}
