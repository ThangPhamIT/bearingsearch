module.exports = function (app) {
    // middle ware libs
    require('./middlewares')(app);
    // controller
    require('./routes')(app);
}