/**
 * Created by kishore on 12/28/15.
 */
var mongoose = require('mongoose'),
    AppBundle = mongoose.model('AppBundle'),
    AppBundleVersion = mongoose.model('AppBundleVersion');
var fs = require('fs');
module.exports = function (app, config, cache) {
    return {
        downloadApk: function (req, res) {
            AppBundleVersion.findOne({"_id": req.params.appBundleId}).exec(function (err, appBundle) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the App Bundle'
                    });
                }
                var file = fs.createReadStream(config.apkRoot + "/" + appBundle.apkId);
                res.setHeader('Content-disposition', 'attachment; filename=application.apk');
                res.setHeader('Content-type', 'application/octet-stream');
                file.pipe(res);

            });
        },
        disableApp: function (req, res) {
            AppBundle.update({'_id': req.params.appBundleId}, {enabled: false}, function (err, appBundle) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot disable the selected Application Bundle'
                    });
                }
                res.json(req.body);
                //updateNavigation(req.body);
            });
        },
        updateAppBundle: function (req, res) {
            AppBundle.update({'_id': req.body['_id']}, {$set: req.body}, function (err, appBundle) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the appBundle'
                    });
                }
                res.json(req.body);
                //updateNavigation(req.body);
            });
        },
        saveAppBundle: function (req, res) {
            var appBundle = new AppBundle(req.body);
            appBundle.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the app bundle'
                    });
                }

                res.json(appBundle);
            });
        },
        fetchAppBundles: function (req, res) {
            AppBundle.find({}).limit(100).exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the application Bundles'
                    });
                }
                res.json(docs);
            });
        },
        fetchActiveAppBundles: function (req, res) {
            AppBundle.find({enabled: true}).limit(100).exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the application Bundles'
                    });
                }
                res.json(docs);
            });
        },
        deleteAppBundle: function (req, res) {
            AppBundle.find({"_id": req.params.appBundleId}).remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot Delete the selected App Bundle'
                    });
                }
                AppBundleVersion.find({"appBundleId": req.params.appBundleId}).remove(function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot delete the versions of the selected app bundle'
                        });
                    }
                    return res.status(200).json({
                        "data": "App bundle deleted successfully"
                    });
                });
            });
        },
        findAppBundle: function (req, res) {
            AppBundle.findOne({"_id": req.params.appBundleId}).exec(function (err, appBundle) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the App Bundle'
                    });
                }
                return res.json(appBundle);
            });
        },
        saveAppBundleVersion: function (req, res) {
            req.body.apkId = req.file.filename;
            req.body.originalFileName = req.file.originalname;
            var appBundleVersion = new AppBundleVersion(req.body);
            appBundleVersion.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the app Bundle version'
                    });
                }

                res.json(appBundleVersion);
            });
        },
        updateAppbundleVersion: function (req, res) {
            req.body.apkId = req.file.filename;
            req.body.originalFileName = req.file.originalname;
            AppBundleVersion.findOne({"_id": req.body['_id']}).exec(function(err, appBundleVersion){
                fs.unlink(config.apkRoot+"/"+appBundleVersion.apkId, function(err){
                    if(err){
                        console.log("File delete failed");
                    }
                });
                AppBundleVersion.update({'_id': req.body['_id']}, {$set: req.body}, function (err, workflow) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the app bundle version'
                        });
                    }

                    res.json(req.body);

                });
            });

        },
        findAppBundleVersion: function (req, res) {
            AppBundleVersion.findOne({"_id": req.params.appBundleVersionId}).exec(function (err, appBundleVersion) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the App Bundle Version'
                    });
                }
                return res.json(appBundleVersion);
            });
        },
        findActiveAppBundleVersion: function (req, res) {
            AppBundleVersion.findOne({
                "appBundleId": req.params.appBundleId,
                "enabled": true
            }).exec(function (err, appBundleVersion) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the App Bundle Version'
                    });
                }
                return res.json(appBundleVersion);
            });
        },
        deleteAppBundleVersion: function (req, res) {
            AppBundleVersion.find({"_id": req.params.appBundleVersionId}).remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot Delete the selected App Bundle'
                    });
                }
            });
        },
        setAsCurrentVersion: function (req, res) {
            AppBundleVersion.findOne({"_id": req.params.appBundleVersionId}).exec(function (err, appBundleVersion) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the App Bundle Version'
                    });
                }
                AppBundleVersion.update({'appBundleId': appBundleVersion.appBundleId}, {"enabled": false}, {multi: true}, function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the App Bundle version'
                        });
                    }
                    appBundleVersion.enabled = true;
                    appBundleVersion.save(function (err) {
                        AppBundle.update({'_id': appBundleVersion.appBundleId}, {"latestVersion": appBundleVersion.version, "latestVersionId": appBundleVersion._id}, function(err){

                        });
                    });
                });
                return res.json(appBundleVersion);
            });
        },
        fetchAppBundleVersions: function (req, res) {
            AppBundleVersion.find({"appBundleId": req.params.appBundleId}).limit(100).exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the application Bundles'
                    });
                }
                res.json(docs);
            });
        },
    };
};