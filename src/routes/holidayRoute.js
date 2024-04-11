const express = require('express');
const router = express.Router();

const holidayController = require('../app/controllers/HolidayController');


router.get('/', holidayController.getAllHolidays);

module.exports = router;