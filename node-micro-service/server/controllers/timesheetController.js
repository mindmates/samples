/**
 * Created by kishore on 12/28/15.
 */
var mongoose = require('mongoose'),
    Timesheet = mongoose.model('Timesheet');
module.exports = function(){
    return {
        fetchTimesheets : function(req,res){
            Timesheet.find({}).limit(100).exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the timesheets'
                    });
                }
                res.json(docs);
            });
        },
        findTimesheet: function(req, res){
            Timesheet.findOne({"_id": req.params.id}).exec(function (err, timesheet) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot fetch the timesheet'
                    });
                }
                return res.json(timesheet);
            });
        },
        saveTimesheet: function(req, res){
            var timesheet = new Timesheet(req.body);
            timesheet.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the timesheet'
                    });
                }
                res.json(timesheet);
            });
        },
        updateTimesheet: function(req, res){
            Timesheet.update({'_id': req.body['_id']}, {$set: req.body}, function (err, page) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the Time sheet'
                    });
                }
                res.json(req.body);
            });
        },
        deleteTimesheet: function(req, res){
            Timesheet.find({"_id": req.params.timesheetId}).remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the timesheet'
                    });
                }
                return res.status(200).json({
                    "data": "Timesheet deleted successfully"
                });
            });
        }
    };
};