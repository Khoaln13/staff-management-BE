const Holiday = require('../models/Holiday');

class HolidayController {
    async getAllHolidays(req, res, next) {
        try {
            const holidays = await Holiday.find({});
            res.status(200).json(holidays);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu ngày nghỉ.',
            });
        }
    }

    async getHolidayById(req, res, next) {
        try {
            const holiday = await Holiday.findById(req.params.id);
            if (!holiday) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy ngày nghỉ.' });
            }
            res.status(200).json(holiday);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin ngày nghỉ.',
            });
        }
    }

    async getHolidayByEmployeeId(req, res, next) {
        try {
            const holiday = await Holiday.find({ employee_id: req.params.id });
            if (!holiday) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy ngày nghỉ.' });
            }
            res.status(200).json(holiday);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin ngày nghỉ.',
            });
        }
    }

    async createHoliday(req, res, next) {
        try {
            const { start_date, end_date } = req.body;
            const newHoliday = new Holiday({ start_date, end_date });
            await newHoliday.save();
            res.status(201).json(newHoliday);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới ngày nghỉ.',
            });
        }
    }

    async updateHoliday(req, res, next) {
        try {
            const holidayId = req.params.id;
            const { start_date, end_date } = req.body;
            const updatedHoliday = await Holiday.findByIdAndUpdate(
                holidayId,
                { start_date, end_date },
                { new: true },
            );
            res.status(200).json(updatedHoliday);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin ngày nghỉ.',
            });
        }
    }

    async deleteHoliday(req, res, next) {
        try {
            const holidayId = req.params.id;
            await Holiday.findByIdAndDelete(holidayId);
            res.status(200).json({
                message: 'Ngày nghỉ đã được xóa thành công.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa ngày nghỉ.',
            });
        }
    }
}

module.exports = new HolidayController();
