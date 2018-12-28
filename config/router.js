module.exports = function({ app, passport, model }) {
    //Index router
    app.use('/', require("./routers/index")({ passport, model }));
    app.use('/update', require("./routers/update")({ passport }))
    app.use("/upload", require("./routers/upload")({ passport , model}));
    app.use('/auth/facebook', require("./routers/auth/facebook")({ passport}));
    app.use('/logout', require("./routers/logout")({ passport }))
}
