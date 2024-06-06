const express = require('express');
const router = express.Router();

const basicSalaryController = require('../app/controllers/BasicSalaryController');
const middlewareController = require('../app/controllers/middlewareController')


router.get('/', basicSalaryController.getAllBasicSalaries);


module.exports = router;