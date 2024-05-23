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

    async getHolidaysRequest(req, res, next) {
        try {
            const holidays = await Holiday.find({ status: 'Pending' })
                .populate({
                    path: 'employee_id',
                    select: 'name',
                    model: 'Staff',
                    populate: {
                        path: 'department_id',
                        select: 'name',
                        model: 'Department'
                    }
                })

            res.status(200).json(holidays);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin ngày nghỉ.',
            });
        }
    }


    async getHolidaysByEmployeeId(req, res, next) {
        try {
            const employee_id = req.params.id
            const holidays = await Holiday.find({ employee_id: employee_id })
                .lean();
            // số ngày đã nghỉ
            const existingHolidays = await Holiday.find({ employee_id: employee_id, status: 'Approved' });
            const totalDaysTaken = existingHolidays.reduce((total, holiday) => {
                const start = new Date(holiday.startDate);
                const end = new Date(holiday.endDate);
                return total + Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
            }, 0);
            // số ngày muốn nghỉ
            const waitingHolidays = await Holiday.find({ employee_id: employee_id, status: 'Pending' });
            const totalDaysWaiting = waitingHolidays.reduce((total, holiday) => {
                const start = new Date(holiday.startDate);
                const end = new Date(holiday.endDate);
                return total + Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
            }, 0);
            res.status(200).json({ holidays, totalDaysTaken, totalDaysWaiting });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin ngày nghỉ.',
            });
        }
    }

    async createHoliday(req, res, next) {
        try {
            const { employee_id, startDate, endDate, description } = req.body;
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            // Kiểm tra số ngày nghỉ
            const existingHolidays = await Holiday.find({ employee_id: employee_id, status: 'Approved' });
            const totalDaysTaken = existingHolidays.reduce((total, holiday) => {
                const start = new Date(holiday.startDate);
                const end = new Date(holiday.endDate);
                return total + Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
            }, 0);

            // số ngày muốn nghỉ
            const waitingHolidays = await Holiday.find({ employee_id: employee_id, status: 'Pending' });
            const totalDaysWaiting = waitingHolidays.reduce((total, holiday) => {
                const start = new Date(holiday.startDate);
                const end = new Date(holiday.endDate);
                return total + Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
            }, 0);

            if (totalDaysTaken + totalDaysWaiting + diffDays > Holiday.maxDays) {
                return res.status(400).json({ message: `Exceeded maximum holiday days of ${Holiday.maxDays}` });
            }

            const newHoliday = new Holiday({
                employee_id,
                startDate,
                endDate,
                description,
                status: 'Pending'
            });

            await newHoliday.save();
            res.status(201).json(newHoliday);
        } catch (error) {
            res.status(500).json({ message: 'Error creating holiday', error });
        }
    }

    async updateHolidayStatus(req, res, next) {
        try {
            const { status } = req.body;
            if (!['Approved', 'Rejected'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            const holiday = await Holiday.findByIdAndUpdate(req.params.holidayId, { status }, { new: true });
            res.status(200).json(holiday);
        } catch (error) {
            res.status(500).json({ message: 'Error updating holiday status', error });
        }
    }

    async updateHolidayInfo(req, res, next) {
        try {
            const newHoliday = req.body;
            const holiday = await Holiday.findByIdAndUpdate(req.params.holidayId, newHoliday, { new: true });
            res.status(200).json(holiday);
        } catch (error) {
            res.status(500).json({ message: 'Error updating holiday status', error });
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
            const holidayId = req.params.holidayId;
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
