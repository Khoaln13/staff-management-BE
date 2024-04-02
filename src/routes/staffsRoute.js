const express = require('express');
const router = express.Router();

const staffsController = require('../app/controllers/StaffController');

router.get('/name/:name', staffsController.getStaffByName);
router.get('/:id', staffsController.getStaffById);
router.put('/:id', staffsController.updateStaff);
router.delete('/:id', staffsController.deleteStaff);
router.post('/create', staffsController.createNewStaff);
router.get('/', staffsController.getAllStaffs);

module.exports = router;
