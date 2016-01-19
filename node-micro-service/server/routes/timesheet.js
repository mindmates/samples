/**
 * Created by kishore on 12/28/15.
 */
module.exports = function(app){
    var baseUrl = "/timesheets";

    var timesheetRouter = require("../controllers/timesheetController")();

    app.get(baseUrl+"/list", timesheetRouter.fetchTimesheets);
    app.get(baseUrl+"/:id", timesheetRouter.findTimesheet);
    app.post(baseUrl+"/", timesheetRouter.saveTimesheet);
    app.post(baseUrl+"/:id", timesheetRouter.updateTimesheet);
    app.delete(baseUrl+"/:id", timesheetRouter.deleteTimesheet);

};