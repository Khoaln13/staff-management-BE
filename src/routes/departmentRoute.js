const express = require('express');
const router = express.Router();

const departmentController = require('../app/controllers/DepartmentController');


router.get('/', departmentController.getAllDepartments);

module.exports = router;