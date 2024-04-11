const Salary = require('../models/Salary');

class SalaryController {
    async getAllSalaries(req, res, next) {
        try {
            const salaries = await Salary.find({});
            res.status(200).json(salaries);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu lương.',
            });
        }
    }

    async getSalaryById(req, res, next) {
        try {
            const salary = await Salary.findById(req.params.id);
            if (!salary) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy thông tin lương.' });
            }
            res.status(200).json(salary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin lương.',
            });
        }
    }

    async getSalaryByEmployeeId(req, res, next) {
        try {
            const salary = await Salary.find({ employee_id: req.params.id });
            if (!salary) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy thông tin lương.' });
            }
            res.status(200).json(salary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin lương.',
            });
        }
    }

    async createSalary(req, res, next) {
        try {
            const { employee_id, salary_type, amount } = req.body;
            const newSalary = new Salary({ employee_id, salary_type, amount });
            await newSalary.save();
            res.status(201).json(newSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới thông tin lương.',
            });
        }
    }

    async updateSalary(req, res, next) {
        try {
            const salaryId = req.params.id;
            const { employee_id, salary_type, amount } = req.body;
            const updatedSalary = await Salary.findByIdAndUpdate(
                salaryId,
                { employee_id, salary_type, amount },
                { new: true },
            );
            res.status(200).json(updatedSalary);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin lương.',
            });
        }
    }

    async deleteSalary(req, res, next) {
        try {
            const salaryId = req.params.id;
            await Salary.findByIdAndDelete(salaryId);
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

module.exports = new SalaryController();
