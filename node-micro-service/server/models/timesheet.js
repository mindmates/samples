/**
 * Created by kishore on 12/28/15.
 */
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
var TimesheetSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    employeeId: {
        type: String
    },
    clientId: {
        type: String
    },
    companyId: {
        type: String
    },

    updated: {
        type: Array
    },
    entries :  [{entryDate: Date, projects:[{name: String, projectId: String, hours: Number}]}]
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);

