const Bonus = require('../models/Bonus');

const bonusController = {
    async getAllBonuses(req, res) {
        try {
            const bonuses = await Bonus.find();
            res.json(bonuses);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createBonus(req, res) {
        try {
            const bonus = new Bonus(req.body);
            await bonus.save();
            res.status(201).json(bonus);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async createBonusesForMultipleEmployees(req, res) {
        try {
            const { employee_ids, data } = req.body
            // Mảng chứa các promise của việc tạo bonus
            const bonusPromises = employee_ids.map(async (employee_id) => {
                // Tạo bonus cho mỗi nhân viên với cùng một thông tin bonus
                const newBonus = new Bonus({
                    employee_id,
                    amount: data.amount,
                    reason: data.reason,
                    date: Date.now()
                });

                // Lưu bonus vào cơ sở dữ liệu
                return newBonus.save();
            });

            // Chờ tất cả các promise hoàn thành
            const createdBonuses = await Promise.all(bonusPromises);

            res.status(201).json(createdBonuses);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async updateBonus(req, res) {
        try {
            const { id } = req.params;
            const { amount, reason } = req.body.dataBody;

            const updatedBonus = await Bonus.findByIdAndUpdate(id, {

                amount,
                reason,

            }, { new: true });

            if (!updatedBonus) {
                return res.status(404).json({ error: 'Bonus not found' });
            }

            res.json(updatedBonus);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBonus(req, res) {
        try {
            const { id } = req.params;

            const deletedBonus = await Bonus.findByIdAndDelete(id);

            if (!deletedBonus) {
                return res.status(404).json({ error: 'Bonus not found' });
            }

            res.json({ message: 'Bonus deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

};

module.exports = bonusController;
