/**
 * Created by kishore on 1/27/16.
 */
/*-------------------- User Urls ---------------------- */
var mongoose = require('mongoose');
module.exports = function (app, config, cache) {
    var User = mongoose.model('User');
    return {
        updateUser: function (req, res) {
            User.update({'_id': req.body['_id']}, {$set: req.body}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the user'
                    });
                }
                res.json(req.body);

            });
        },
        saveUser: function (req, res) {
            var user = new User(req.body);
            user.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the user'
                    });
                }
                res.json(user);
            });
        },
        fetchUsers: function (req, res) {
            User.find({}).limit(100).exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the user'
                    });
                }
                res.json(docs);
            });
        },
        deleteUser: function (req, res) {
            User.find({"_id": req.params.userId}).remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the user'
                    });
                }
                return res.status(200).json({
                    "data": "User deleted successfully"
                });
            });

        },
        findUser: function (req, res) {
            User.findOne({"_id": req.params.userId}).exec(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the user'
                    });
                }
                return res.json(user);
            });
        }


    }

}


