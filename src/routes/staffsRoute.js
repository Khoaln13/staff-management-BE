const express = require('express');
const router = express.Router();

const staffsController = require('../app/controllers/StaffController');
const middlewareController = require('../app/controllers/middlewareController')

router.get('/filter', middlewareController.verifyTokenAndAdminAuth, staffsController.filterStaffs);
router.get('/:id', middlewareController.veryfyTokenAndUserOrAdminAuth, staffsController.getStaffById);
router.put('/:id', middlewareController.verifyTokenAndAdminAuth, staffsController.updateStaff);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, staffsController.deleteStaff);
router.post('/create', middlewareController.verifyTokenAndAdminAuth, staffsController.createNewStaff);
router.get('/', middlewareController.verifyTokenAndAdminAuth, staffsController.getAllStaffsPagination);
router.get('/', middlewareController.verifyTokenAndAdminAuth, staffsController.getAllStaffs);

module.exports = router;
