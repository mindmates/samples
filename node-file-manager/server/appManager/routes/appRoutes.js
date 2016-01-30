/**
 * Created by kishore on 12/28/15.
 */
module.exports = function(app, config, cache){
    var multer  = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/var/www/apks')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now()+".apk")
        }
    });
    var upload = multer({ storage: storage })
    var rootUrl = "/api";

    var appController = require("../controllers/appController")(app, config, cache);

    //----------- App Bundle Url Mappings-----------------

    app.post(rootUrl+'/appBundle/save', appController.saveAppBundle);
    app.get(rootUrl+'/appBundle/list', appController.fetchAppBundles);
    app.get(rootUrl+"/appBundle/:appBundleId", appController.findAppBundle);
    app.put(rootUrl+"/appBundle/:appBundleId", appController.updateAppBundle);
    app.delete(rootUrl+"/appBundle/:appBundleId", appController.deleteAppBundle);
    app.get(rootUrl+"/appBundle/download/:appBundleId", appController.downloadApk);
    app.get(rootUrl+"/appBundle/disable/:appBundleId", appController.disableApp);

    //------------ App Bundle Versions mapping

    app.post(rootUrl+'/appBundle-version/save',upload.single('file'), appController.saveAppBundleVersion);
    app.get(rootUrl+'/appBundle-version/list/:appBundleId', appController.fetchAppBundleVersions);
    app.get(rootUrl+"/appBundle-version/:appBundleVersionId", appController.findAppBundleVersion);
    app.post(rootUrl+"/appBundle-version/:appBundleVersionId",upload.single('file'), appController.updateAppbundleVersion);
    app.put(rootUrl+"/appBundle-version/setCurrent/:appBundleVersionId", appController.setAsCurrentVersion);
    app.delete(rootUrl+"/appBundle-version/:appBundleVersionId", appController.deleteAppBundleVersion);

};