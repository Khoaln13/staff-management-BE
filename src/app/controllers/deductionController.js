const Deduction = require('../models/Deduction');

const deductionController = {
    async getAllDeductions(req, res) {
        try {
            const deductions = await Deduction.find();
            res.json(deductions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createDeduction(req, res) {
        try {
            const deduction = new Deduction(req.body);
            await deduction.save();
            res.status(201).json(deduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async createDeductionsForMultipleEmployees(req, res) {
        try {
            const { employee_ids, data } = req.body;
            // Mảng chứa các promise của việc tạo deduction
            const deductionPromises = employee_ids.map(async (employee_id) => {
                // Tạo deduction cho mỗi nhân viên với cùng một thông tin deduction
                const newDeduction = new Deduction({
                    employee_id,
                    amount: data.amount,
                    reason: data.reason,
                    date: Date.now()
                });

                // Lưu deduction vào cơ sở dữ liệu
                return newDeduction.save();
            });

            // Chờ tất cả các promise hoàn thành
            const createdDeductions = await Promise.all(deductionPromises);

            res.status(201).json(createdDeductions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateDeduction(req, res) {
        try {
            const { id } = req.params;
            const { amount, reason } = req.body.dataBody;

            const updatedDeduction = await Deduction.findByIdAndUpdate(id, {

                amount,
                reason,

            }, { new: true });

            if (!updatedDeduction) {
                return res.status(404).json({ error: 'Deduction not found' });
            }

            res.json(updatedDeduction);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteDeduction(req, res) {
        try {
            const { id } = req.params;

            const deletedDeduction = await Deduction.findByIdAndDelete(id);

            if (!deletedDeduction) {
                return res.status(404).json({ error: 'Deduction not found' });
            }

            res.json({ message: 'Deduction deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = deductionController;
