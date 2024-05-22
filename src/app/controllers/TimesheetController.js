const Timesheet = require('../models/Timesheet');

class TimesheetController {
    async getTimesheets(req, res, next) {
        try {
            const timesheets = await Timesheet.find({ employee_id: req.params.id })
                .sort({ date: -1 })
                .lean();

            res.status(200).json(timesheets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu timesheets.' });
        }
    }

    async createTimesheet(req, res, next) {
        try {

            const timesheet = new Timesheet({ ...req.body.newTimesheet });
            await timesheet.save();
            res.status(201).json(timesheet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo mới timesheet.' });
        }
    }


    async updateTimesheet(req, res, next) {
        try {
            const timesheetId = req.params.id
            const timesheet = await Timesheet.findByIdAndUpdate(
                timesheetId,
                { description: req.body.editedTimesheet?.description, updatedAt: Date.now() },
                { new: true }
            );
            console.log(timesheet);
            res.status(200).json(timesheet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thông tin timesheet.' });
        }
    }


    async deleteTimesheet(req, res, next) {
        try {
            const timesheetId = req.params.id;
            await Timesheet.findByIdAndDelete(timesheetId);
            res.status(200).json({ message: 'Timesheet đã được xóa thành công.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa timesheet.' });
        }
    }
}

module.exports = new TimesheetController();
