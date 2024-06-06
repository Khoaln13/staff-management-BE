const Staff = require('../models/Staff');
const Department = require('../models/Department');
const Position = require('../models/Position');
const Role = require('../models/Role');
const PositionHistory = require('../models/PositionHistory');
const PositionHistoryController = require('./PositionHistoryController');
const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BasicSalary = require('../models/BasicSalary');
const moment = require('moment');
const Timesheet = require('../models/Timesheet');
const Payroll = require('../models/Payroll'); // Import Payroll model
const Bonus = require('../models/Bonus'); // Import Bonus model
const Deduction = require('../models/Deduction'); // Import Deduction model
const Allowance = require('../models/Allowance'); // Import Allowance model

class StaffController {
    // [GET] http://localhost:3000/api/v1/staffs/
    async getAllStaffs(req, res, next) {
        try {
            const sevenDaysAgo = moment().subtract(7, 'days').toDate();
            const currentMonth = moment().month() + 1; // Tháng hiện tại (1-12)
            const currentYear = moment().year(); // Năm hiện tại

            const staffs = await Staff.find({})
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .lean();

            if (!staffs || staffs.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên nào.' });
            }

            // Lấy timesheets trong 7 ngày gần đây cho từng nhân viên
            for (const staff of staffs) {
                const timesheets = await Timesheet.find({
                    employee_id: staff._id,
                    date: { $gte: sevenDaysAgo }
                }).sort({ date: -1 }).lean();
                staff.timesheets = timesheets;

                // Lấy lịch sử lương tháng hiện tại
                const payroll = await Payroll.findOne({
                    employee_id: staff._id,
                    month: currentMonth,
                    year: currentYear
                }).lean();
                staff.payroll = payroll;

                // Lấy lịch sử thưởng tháng hiện tại
                const bonuses = await Bonus.find({
                    employee_id: staff._id,
                    date: {
                        $gte: moment().startOf('month').toDate(),
                        $lte: moment().endOf('month').toDate()
                    }
                }).lean();
                staff.bonuses = bonuses;

                // Lấy lịch sử khấu trừ tháng hiện tại
                const deductions = await Deduction.find({
                    employee_id: staff._id,
                    date: {
                        $gte: moment().startOf('month').toDate(),
                        $lte: moment().endOf('month').toDate()
                    }
                }).lean();
                staff.deductions = deductions;

                // Lấy phụ cấp hiện tại
                const allowances = await Allowance.find({
                    employee_id: staff._id,

                }).lean();
                staff.allowances = allowances;
            }

            res.status(200).json({ staffs });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.',
            });
        }
    }

    // [GET] http://localhost:3000/api/v1/staffs/
    async getAllStaffsPagination(req, res, next) {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là trang 1 nếu không được cung cấp
        const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử trên mỗi trang, mặc định là 10 nếu không được cung cấp

        try {
            const totalStaffs = await Staff.countDocuments(); // Tổng số nhân viên

            const totalPages = Math.ceil(totalStaffs / limit); // Tổng số trang
            const skip = (page - 1) * limit; // Số lượng bản ghi bị bỏ qua

            const staffs = await Staff.find({})
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .skip(skip)
                .limit(limit)
                .lean();

            res.status(200).json({
                staffs,
                totalPages,
                limit,
                currentPage: page,
                totalStaffs
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.' });
        }
    }
    //[GET] http://localhost:3000/api/v1/staffs/:id/
    async getStaffById(req, res, next) {
        try {
            const staff = await Staff.findById(req.params.id)
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .lean();
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

    async findStaffByAccountId(accountId) {
        try {
            const staff = await Staff.findOne({ account_id: accountId })
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .lean();

            return staff;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async findStaffById(Id) {
        try {
            const staff = await Staff.findById(Id)
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .lean();

            return staff;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    //get staff with all information
    //[GET] http://localhost:3000/api/v1/staffs/infor/:id/

    async getStaffInformationById(req, res, next) {
        try {
            const staff = await Staff.findById(req.params.id)
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'role_id',
                    select: 'name',
                    model: 'Role',
                })
                .populate({
                    path: 'account_id',
                    select: 'username ',
                    model: 'Account',
                })
                .lean();
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
            const staffs = await Staff.find({ name: regex })
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .lean();

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

    // Lọc nhân viên theo tên, tên phòng ban và tên vị trí
    //[GET] http://localhost:3000/api/v1/staffs/filter
    async filterStaffs(req, res, next) {
        try {
            let filter = {};

            // Lọc theo tên (nếu có)
            if (req.query.name) {
                filter.name = { $regex: new RegExp(req.query.name, 'i') };
            }

            // Lọc theo phòng ban (nếu có)
            if (req.query.department) {
                // Tìm phòng ban dựa trên tên
                const department = await Department.findOne({
                    name: req.query.department,
                });
                if (department) {
                    filter.department_id = department._id;
                } else {
                    filter.department_id = null;
                }
            }

            // Lọc theo vị trí (nếu có)
            if (req.query.position) {
                // Tìm vị trí dựa trên tên
                const position = await Position.findOne({
                    title: req.query.position,
                });
                if (position) {
                    filter.position_id = position._id;
                } else {
                    filter.position_id = null;
                }
            }

            // Phân trang
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10; // Số lượng nhân viên trên mỗi trang
            const skip = (page - 1) * limit;

            // Thực hiện truy vấn lọc và phân trang
            const staffs = await Staff.find(filter)
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .skip(skip)
                .limit(limit)
                .lean();

            // Đếm tổng số nhân viên
            const totalStaffs = await Staff.countDocuments(filter);

            if (!staffs || staffs.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy nhân viên nào.' });
            }

            // Trả về kết quả với thông tin phân trang
            res.status(200).json({ staffs, currentPage: page, totalStaffs, limit });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu nhân viên.',
            });
        }
    }


    //[POST] http://localhost:3000/api/v1/staffs/create

    async createNewStaff(req, res, next) {
        console.log(req.body);
        const newAccount = req.body.newAccount;
        const newStaff = req.body.newStaff;
        const newPositionHistory = req.body.newPositionHistory
        const newBasicSalary = req.body.newBasicSalary
        try {
            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingAccount = await Account.findOne({ username: newAccount.username });
            if (existingAccount) {
                return res.status(409).json({ message: 'Tài khoản đã tồn tại.' });
            }

            // Kiểm tra xem nhân viên đã tồn tại chưa (dựa trên email và số điện thoại)
            const existingStaff = await Staff.findOne({
                name: newStaff.name,
                email: newStaff.email,
                dateOfBirth: newStaff.dateOfBirth,
                address: newStaff.address,
                gender: newStaff.gender,
                phone: newStaff.phone,
            });

            if (existingStaff) {
                return res.status(409).json({ message: 'Nhân viên đã tồn tại trong hệ thống.' });
            }

            // Nếu tài khoản và nhân viên đều chưa tồn tại, tiếp tục tạo mới tài khoản
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newAccount.password, salt);

            const newAccountData = new Account({
                username: newAccount.username,
                password: hashedPassword,
            });

            const account = await newAccountData.save();

            // Tạo nhân viên mới và liên kết với tài khoản vừa tạo
            const staff = new Staff({
                ...newStaff,
                account_id: account._id, // Liên kết tài khoản với nhân viên
            });

            await staff.save();
            const positionHistory = new PositionHistory({
                ...newPositionHistory,
                employee_id: staff._id,
            })
            positionHistory.save();
            const basicSalary = new BasicSalary({
                amount: newBasicSalary,
                employee_id: staff._id,
            })
            basicSalary.save();
            res.status(201).json({
                message: 'Nhân viên đã được tạo mới thành công.',
                account,
                staff,
                positionHistory
            });
        } catch (error) {
            console.log('error: ' + error.message);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới tài khoản hoặc nhân viên.',
            });
        }
    }

    //[PUT] http://localhost:3000/api/v1/staffs/:id/
    async updateStaff(req, res, next) {
        try {
            const staffId = req.params.id;
            const formData = req.body;
            console.log(formData);
            // Kiểm tra xem nhân viên có tồn tại trong cơ sở dữ liệu không
            const existingStaff = await Staff.findById(staffId);
            if (!existingStaff) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên.' });
            }

            // Cập nhật thông tin của nhân viên
            const updatedStaff = await Staff.findByIdAndUpdate(staffId, formData.updatedStaffInfo, { new: true });

            res.status(200).json({ updatedStaff, });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi cập nhật thông tin nhân viên.',
            });
        }
    }

    async updateStaffPosition(req, res, next) {
        try {
            const staffId = req.params.id;
            const formData = req.body.updatedStaffWork;
            console.log(formData);

            // Kiểm tra xem nhân viên có tồn tại trong cơ sở dữ liệu không
            const existingStaff = await Staff.findById(staffId);
            if (!existingStaff) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy nhân viên.' });
            }

            // Tìm vị trí làm việc hiện tại
            const currentPosition = await PositionHistoryController.findCurrentPosition(staffId);

            // Cập nhật để kết thúc vị trí hiện tại
            if (currentPosition) {
                await PositionHistoryController.updatePositionHistoryEndDate(currentPosition._id);
            }

            // Thêm vị trí mới
            const newPositionHistory = new PositionHistory({
                employee_id: staffId,
                department_id: formData.department_id,
                position_id: formData.position_id,
                start_date: new Date(),
                end_date: null,
            });
            await newPositionHistory.save();
            console.log("thay đổi vị trí thành công");
            res.status(200).json({
                newPositionHistory
            });
        } catch (error) {
            console.log(error.message);
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
            //Xóa position_history
            //Xóa salary
            //Xóa holiday
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
