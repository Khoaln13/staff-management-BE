const Department = require('../models/Department');

class DepartmentController {
    async getAllDepartments(req, res, next) {
        try {
            const departments = await Department.find({});
            res.status(200).json(departments);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu phòng ban.',
            });
        }
    }

    async getDepartmentById(req, res, next) {
        try {
            const department = await Department.findById(req.params.id);
            if (!department) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy phòng ban.' });
            }
            res.status(200).json(department);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin phòng ban.',
            });
        }
    }

    async createDepartment(req, res, next) {
        try {
            const { name } = req.body;
            const newDepartment = new Department({ name });
            await newDepartment.save();
            res.status(201).json(newDepartment);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới phòng ban.',
            });
        }
    }

    async updateDepartment(req, res, next) {
        try {
            const departmentId = req.params.id;
            const { name } = req.body;
            const updatedDepartment = await Department.findByIdAndUpdate(
                departmentId,
                { name },
                { new: true },
            );
            res.status(200).json(updatedDepartment);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin phòng ban.',
            });
        }
    }

    async deleteDepartment(req, res, next) {
        try {
            const departmentId = req.params.id;
            await Department.findByIdAndDelete(departmentId);
            res.status(200).json({
                message: 'Phòng ban đã được xóa thành công.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa phòng ban.',
            });
        }
    }
}

module.exports = new DepartmentController();
