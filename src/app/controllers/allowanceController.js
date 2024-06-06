const Allowance = require('../models/Allowance');

const allowanceController = {
    async getAllAllowances(req, res) {
        try {
            const allowances = await Allowance.find();
            res.json(allowances);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createAllowance(req, res) {
        try {
            const allowance = new Allowance(req.body);
            await allowance.save();
            res.status(201).json(allowance);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async createAllowancesForMultipleEmployees(req, res) {
        try {
            const { employee_ids, data } = req.body;
            // Mảng chứa các promise của việc tạo allowance
            const allowancePromises = employee_ids.map(async (employee_id) => {
                // Tạo allowance cho mỗi nhân viên với cùng một thông tin allowance
                const newAllowance = new Allowance({
                    employee_id,
                    amount: data.amount,
                    reason: data.reason,
                    date: Date.now()
                });

                // Lưu allowance vào cơ sở dữ liệu
                return newAllowance.save();
            });

            // Chờ tất cả các promise hoàn thành
            const createdAllowances = await Promise.all(allowancePromises);

            res.status(201).json(createdAllowances);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateAllowance(req, res) {
        try {
            const { id } = req.params;
            const { amount, reason } = req.body.dataBody;

            const updatedAllowance = await Allowance.findByIdAndUpdate(id, {

                amount,
                reason,

            }, { new: true });

            if (!updatedAllowance) {
                return res.status(404).json({ error: 'Allowance not found' });
            }

            res.json(updatedAllowance);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteAllowance(req, res) {
        try {
            const { id } = req.params;

            const deletedAllowance = await Allowance.findByIdAndDelete(id);

            if (!deletedAllowance) {
                return res.status(404).json({ error: 'Allowance not found' });
            }

            res.json({ message: 'Allowance deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = allowanceController;
