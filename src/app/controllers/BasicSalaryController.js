const BasicSalary = require('../models/BasicSalary');

class BasicSalaryController {
    async getAllBasicSalaries(req, res, next) {
        try {
            const basicSalaries = await BasicSalary.find({});
            res.status(200).json(basicSalaries);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu lương.',
            });
        }
    }

    async getBasicSalaryById(req, res, next) {
        try {
            const basicSalary = await BasicSalary.findById(req.params.id);
            if (!basicSalary) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy thông tin lương.' });
            }
            res.status(200).json(basicSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin lương.',
            });
        }
    }

    async getBasicSalaryByEmployeeId(req, res, next) {
        try {
            const basicSalary = await BasicSalaries.find({ employee_id: req.params.id });
            if (!basicSalary) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy thông tin lương.' });
            }
            res.status(200).json(basicSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin lương.',
            });
        }
    }

    async createBasicSalary(req, res, next) {
        try {
            const { employee_id, amount } = req.body;
            const newBasicSalary = new Salary({ employee_id, amount });
            await newSalary.save();
            res.status(201).json(newBasicSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới thông tin lương.',
            });
        }
    }

    async updateBasicSalary(req, res, next) {
        try {
            const basicSalaryId = req.params.id;
            const { employee_id, amount } = req.body;
            const updatedBasicSalary = await BasicSalary.findByIdAndUpdate(
                basicSalaryId,
                { employee_id, amount },
                { new: true },
            );
            res.status(200).json(updatedBasicSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin lương.',
            });
        }
    }

    async deleteBasicSalary(req, res, next) {
        try {
            const basicSalaryId = req.params.id;
            await BasicSalary.findByIdAndDelete(basicSalaryId);
            res.status(200).json({
                message: 'Thông tin lương đã được xóa thành công.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa thông tin lương.',
            });
        }
    }
}

module.exports = new BasicSalaryController();
