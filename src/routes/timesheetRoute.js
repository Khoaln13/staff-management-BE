const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/middlewareController')
const timesheetController = require('../app/controllers/TimesheetController');

//:id is the id of the employee
router.get('/staff/:id', middlewareController.verifyTokenAndUserOrAdminAuth, timesheetController.getTimesheets);

//:id is the id of timesheet
router.put('/:id', middlewareController.verifyTokenAndUserOrAdminAuth, timesheetController.updateTimesheet);

router.post('/', middlewareController.verifyTokenAndUserOrAdminAuth, timesheetController.createTimesheet);
module.exports = router;