const Staff = require('../models/Staff');

class StaffController {
    // [GET] http://localhost:3000/api/v1/staffs/
    async getAllStaffs(req, res, next) {
        try {
            const staffs = await Staff.find({}).lean();
            if (!staffs) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên nào.' });
            }
            res.status(200).json(staffs);
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.',
            });
        }
    }

    //[GET] http://localhost:3000/api/v1/staffs/:id/
    async getStaffById(req, res, next) {
        try {
            const staff = await Staff.findById(req.params.id).lean();
            if (!staff) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên nào.' });
            }
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.',
            });
        }
    }
    //[GET] http://localhost:3000/api/v1/staffs/name/:name/
    async getStaffByName(req, res, next) {
        try {
            const nameQuery = req.params.name;
            const regex = new RegExp(nameQuery, 'i'); // 'i' cho phép tìm kiếm không phân biệt chữ hoa chữ thường
            const staffs = await Staff.find({ name: regex }).lean();

            if (staffs.length === 0) {
                return res.status(404).json({
                    message: 'Không tìm thấy nhân viên nào với tên đã nhập.',
                });
            }

            res.status(200).json(staffs);
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.',
            });
        }
    }

    //[POST] http://localhost:3000/api/v1/staffs/create

    async createNewStaff(req, res, next) {
        try {
            const formData = req.body;

            // Kiểm tra xem có nhân viên nào có cùng thông tin với thông tin mới không
            const existingStaff = await Staff.findOne(formData);
            if (existingStaff) {
                // Nếu đã tồn tại, gửi lại phản hồi với mã trạng thái 409 (Conflict)
                return res
                    .status(409)
                    .json({ message: 'Nhân viên đã tồn tại trong hệ thống.' });
            }

            // Nếu không có nhân viên nào trùng khớp, tiếp tục tạo mới nhân viên
            const staff = new Staff(formData);
            await staff.save();

            res.status(201).json({
                message: 'Nhân viên đã được tạo mới thành công.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới nhân viên.',
            });
        }
    }

    //[PUT] http://localhost:3000/api/v1/staffs/:id/
    async updateStaff(req, res, next) {
        try {
            const staffId = req.params.id;
            const formData = req.body;

            // Kiểm tra xem nhân viên có tồn tại trong cơ sở dữ liệu không
            const existingStaff = await Staff.findById(staffId);
            if (!existingStaff) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên.' });
            }

            // Cập nhật thông tin của nhân viên
            await Staff.findByIdAndUpdate(staffId, formData);

            res.status(200).json({
                message: 'Thông tin nhân viên đã được cập nhật thành công.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin nhân viên.',
            });
        }
    }

    //[DELETE] http://localhost:3000/api/v1/staffs/:id
    async deleteStaff(req, res, next) {
        try {
            const staffId = req.params.id;

            // Kiểm tra xem nhân viên có tồn tại trong cơ sở dữ liệu không
            const existingStaff = await Staff.findById(staffId);
            if (!existingStaff) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên.' });
            }

            // Xóa nhân viên
            await Staff.findByIdAndDelete(staffId);

            res.status(200).json({
                message: 'Nhân viên đã được xóa thành công.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa nhân viên.',
            });
        }
    }
}

module.exports = new StaffController();
