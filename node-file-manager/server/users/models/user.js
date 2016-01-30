/**
 * Created by kishore on 12/13/15.
 */
/**
 * Created by kishore on 12/11/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var UserSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    middleName: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: Boolean
    },
    role: [{name: String, id: String}],
    groups: [{name: String, id: String}],
    orgs: [{name: String, id: String}],
    regions: [{name: String, id: String}],
    updated: {
        type: Array
    }
});

module.exports = mongoose.model('User', UserSchema);

