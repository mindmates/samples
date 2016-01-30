/**
 * Created by kishore on 1/27/16.
 */
module.exports = function (app, config,cache) {
    //----------- User Url Mappings-----------------
    var rootUrl = "/api";
    var userController = require('../controllers/userController')(app, config, cache);

    app.post(rootUrl + '/user/save', userController.saveUser);
    app.get(rootUrl + '/user/list', userController.fetchUsers);
    app.get(rootUrl + "/user/:userId", userController.findUser);
    app.put(rootUrl + "/user/:userId", userController.updateUser);
    app.delete(rootUrl + "/user/:workflowId", userController.deleteUser);
}
