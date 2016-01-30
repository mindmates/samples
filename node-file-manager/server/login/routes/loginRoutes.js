module.exports = function (app, config,cache) {
    var loginRouter = require('../controllers/loginController')(app, config, cache);

    app.get('/', loginRouter.renderLoginPage);

    app.post('/', loginRouter.postLoginCall);

    app.post('/login/mobile', loginRouter.postLoginCall);
}