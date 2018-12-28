module.exports = {
    urlWeb: process.env.URL_WEB,
    facebook: {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_SECRET
    },
    sequelize: {
        database: 'webkma',
        username: 'postgres',
        password: 'webkma',
        host: 'localhost'
    }
}
