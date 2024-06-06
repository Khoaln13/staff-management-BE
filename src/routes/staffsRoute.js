const express = require('express');
const router = express.Router();

const staffsController = require('../app/controllers/StaffController');
const middlewareController = require('../app/controllers/middlewareController')

router.get('/filter', middlewareController.verifyTokenAndAdminAuth, staffsController.filterStaffs);
router.get('/:id', middlewareController.verifyTokenAndUserOrAdminAuth, staffsController.getStaffById);
router.put('/info/:id', middlewareController.verifyTokenAndUserOrAdminAuth, staffsController.updateStaff);
router.put('/work/:id', middlewareController.verifyTokenAndUserOrAdminAuth, staffsController.updateStaffPosition);
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, staffsController.deleteStaff);
router.post('/create', middlewareController.verifyTokenAndAdminAuth, staffsController.createNewStaff);
router.get('/info/:id', middlewareController.verifyTokenAndUserOrAdminAuth, staffsController.getStaffInformationById);
router.get('/paginate', middlewareController.verifyTokenAndAdminAuth, staffsController.getAllStaffsPagination);
router.get('/', middlewareController.verifyTokenAndAdminAuth, staffsController.getAllStaffs);

module.exports = router;
