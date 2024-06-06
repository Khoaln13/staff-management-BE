const Payroll = require('../models/Payroll');
const BasicSalary = require('../models/BasicSalary');
const Bonus = require('../models/Bonus');
const Deduction = require('../models/Deduction');
const Allowance = require('../models/Allowance');
const payrollController = {
    async getAllPayrolls(req, res) {
        try {
            const payrolls = await Payroll.find();
            res.json(payrolls);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createPayroll(req, res) {
        const { employee_id, month, year } = req.body;

        try {
            // Get basic salary for the employee
            const basicSalary = await BasicSalary.findOne({ employee_id });
            if (!basicSalary) {
                return res.status(400).json({ error: 'Basic salary not found for the employee' });
            }

            // Calculate total bonuses for the month
            const bonuses = await Bonus.find({ employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });
            const totalBonus = bonuses.reduce((acc, bonus) => acc + bonus.amount, 0);

            // Calculate total deductions for the month
            const deductions = await Deduction.find({ employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });
            const totalDeduction = deductions.reduce((acc, deduction) => acc + deduction.amount, 0);

            // Calculate total allowances for the month
            const allowances = await Allowance.find({ employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });
            const totalAllowance = allowances.reduce((acc, allowance) => acc + allowance.amount, 0);

            // Calculate total salary (including basic salary, bonuses, deductions, and allowances)
            const totalSalary = basicSalary.amount + totalBonus - totalDeduction + totalAllowance;

            // Create payroll record
            const newPayroll = new Payroll({
                employee_id,
                month,
                year,
                basic_salary: basicSalary.amount,
                bonus: totalBonus,
                deduction: totalDeduction,
                allowance: totalAllowance,
                total_salary: totalSalary
            });
            await newPayroll.save();
            res.status(201).json(newPayroll);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async createPayrollForAllEmployees(req, res) {
        try {
            // Truy vấn tất cả các nhân viên
            const employees = await Employee.find();

            // Duyệt qua từng nhân viên và tạo bảng lương
            const payrollRecords = await Promise.all(employees.map(async (employee) => {
                const { _id: employee_id } = employee;
                const { month, year } = req.body;

                // Lấy lương cơ bản của nhân viên
                const basicSalary = await BasicSalary.findOne({ employee_id });
                if (!basicSalary) {
                    throw new Error(`Basic salary not found for employee with ID: ${employee_id}`);
                }

                // Tính tổng tiền thưởng cho tháng
                const bonuses = await Bonus.find({ employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });
                const totalBonus = bonuses.reduce((acc, bonus) => acc + bonus.amount, 0);

                // Tính tổng tiền khấu trừ cho tháng
                const deductions = await Deduction.find({ employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });
                const totalDeduction = deductions.reduce((acc, deduction) => acc + deduction.amount, 0);
                // Calculate total allowances for the month
                const allowances = await Allowance.find({ employee_id });
                const totalAllowance = allowances.reduce((acc, allowance) => acc + allowance.amount, 0);

                // Calculate total salary (including basic salary, bonuses, deductions, and allowances)
                const totalSalary = basicSalary.amount + totalBonus - totalDeduction + totalAllowance;

                // Create payroll record
                const newPayroll = new Payroll({
                    employee_id,
                    month,
                    year,
                    basic_salary: basicSalary.amount,
                    bonus: totalBonus,
                    deduction: totalDeduction,
                    allowance: totalAllowance,
                    total_salary: totalSalary
                });

                // Lưu bản ghi bảng lương
                return newPayroll.save();
            }));

            // Gửi phản hồi về cho người dùng
            res.status(201).json(payrollRecords);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async getPayrollByEmployeeId(req, res) {
        const { employee_id } = req.params;

        try {
            const payrolls = await Payroll.find({ employee_id });

            if (!payrolls) {
                return res.status(404).json({ error: 'No payroll records found for the employee' });
            }
            res.json(payrolls);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getPayrollDetailsWithTime(req, res) {
        try {
            const employee_id = req.query.employee_id
            const month = req.query.month
            const year = req.query.year

            const payroll = await Payroll.findOne({ employee_id: employee_id, month: month, year: year });

            // Get bonuses for the employee in the specified month and year
            const bonuses = await Bonus.find({ employee_id: employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });

            // Get deductions for the employee in the specified month and year
            const deductions = await Deduction.find({ employee_id: employee_id, date: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } });

            // Get allowances for the employee in the specified month and year
            const allowances = await Allowance.find({ employee_id: employee_id });

            res.json({ payroll, bonuses, deductions, allowances });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = payrollController;
