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
 * App Bundle Schema
 */
var AppBundleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    packageName: {
        type: String
    },
    latestVersion: {
        type: String,
        trim: true
    },
    latestVersionId: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true,
        trim: true
    },
    updated: {
        type: Array
    },
    groups: [{name: String, id: String}],
    orgs: [{name: String, id: String}],
    regions: [{name: String, id: String}]

});

module.exports = mongoose.model('AppBundle', AppBundleSchema);

