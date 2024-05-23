const express = require('express');
const router = express.Router();
const middlewareController = require('../app/controllers/middlewareController')

const holidayController = require('../app/controllers/HolidayController');






// Cập nhật trạng thái nghỉ phép
router.put('/:holidayId/status', middlewareController.verifyTokenAndUserOrAdminAuth, holidayController.updateHolidayStatus);
// Cập nhật thông tin request nghỉ phép
router.put('/:holidayId/update', middlewareController.verifyTokenAndUserOrAdminAuth, holidayController.updateHolidayInfo);
router.delete('/:holidayId/', middlewareController.verifyTokenAndUserOrAdminAuth, holidayController.deleteHoliday);
//Lấy thông tin nghỉ phép đang chờ duyệt admin
router.get('/pending/', middlewareController.verifyTokenAndAdminAuth, holidayController.getHolidaysRequest);
// Lấy thông tin nghỉ phép của nhân viên theo ID nhân viên
router.get('/:id', middlewareController.verifyTokenAndUserOrAdminAuth, holidayController.getHolidaysByEmployeeId);
// Tạo mới nghỉ phép cho staff có id = id
router.post('/:id', middlewareController.verifyTokenAndUser, holidayController.createHoliday);

module.exports = router;