/**
 * Created by kishore on 12/14/15.
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
 * App Bundle Version Schema
 */
var AppBundleVersionSchema = new Schema({
    appBundleId: Schema.Types.ObjectId,
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
    version: {
        type: String,
        required: true,
        trim: true
    },
    apkId: {
        type: String
    },
    originalFileName: {
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
    appSource: {
        type: String
    }
});

module.exports = mongoose.model('AppBundleVersion', AppBundleVersionSchema);

