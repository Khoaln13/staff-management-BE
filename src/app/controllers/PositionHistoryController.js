const PositionHistory = require('../models/PositionHistory');

class PositionHistoryController {
    async getAllPositionHistories(req, res, next) {
        try {
            const positionHistories = await PositionHistory.find({})
                .populate({
                    path: 'employee_id',
                    select: 'name',
                    model: 'Staff',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                }).lean();
            res.status(200).json(positionHistories);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    'Đã xảy ra lỗi khi lấy dữ liệu lịch sử vị trí công việc.',
            });
        }
    }

    async getPositionHistoryById(req, res, next) {
        try {
            const positionHistory = await PositionHistory.findById(
                req.params.id,
            ).populate({
                path: 'employee_id',
                select: 'name',
                model: 'Staff',
            })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                }).lean();
            if (!positionHistory) {
                return res
                    .status(404)
                    .json({
                        message: 'Không tìm thấy lịch sử vị trí công việc.',
                    });
            }
            res.status(200).json(positionHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    'Đã xảy ra lỗi khi lấy thông tin lịch sử vị trí công việc.',
            });
        }
    }

    async getPositionHistoryByEmployeeId(req, res, next) {
        try {
            const positionHistory = await PositionHistory.find({
                employee_id: req.params.id,
            })
                .populate({
                    path: 'employee_id',
                    select: 'name',
                    model: 'Staff',
                })
                .populate({
                    path: 'position_id',
                    select: 'title',
                    model: 'Position',
                })
                .populate({
                    path: 'department_id',
                    select: 'name',
                    model: 'Department',
                })
                .lean();
            if (!positionHistory) {
                return res
                    .status(404)
                    .json({
                        message: 'Không tìm thấy lịch sử vị trí công việc.',
                    });
            }
            res.status(200).json(positionHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    'Đã xảy ra lỗi khi lấy thông tin lịch sử vị trí công việc.',
            });
        }
    }

    async getPositionHistoryById(req, res, next) {
        try {
            const positionHistory = await PositionHistory.findById(
                req.params.id,
            );
            if (!positionHistory) {
                return res
                    .status(404)
                    .json({
                        message: 'Không tìm thấy lịch sử vị trí công việc.',
                    });
            }
            res.status(200).json(positionHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    'Đã xảy ra lỗi khi lấy thông tin lịch sử vị trí công việc.',
            });
        }
    }
    async findCurrentPosition(employee_id) {
        try {
            const currentPosition = await PositionHistory.findOne({
                employee_id: employee_id,
                end_date: null
            });

            return currentPosition;
        } catch (error) {
            console.error('Đã xảy ra lỗi khi tìm vị trí hiện tại.', error);
            throw new Error('Đã xảy ra lỗi khi tìm vị trí hiện tại.');
        }
    }

    async createPositionHistory(req, res, next) {
        try {
            const { employee_id, position_id, start_date, end_date } = req.body;
            const newPositionHistory = new PositionHistory({
                employee_id,
                position_id,
                start_date,
                end_date,
            });
            await newPositionHistory.save();
            console.log("Tạo mới lịch sử cv thành công")
            res.status(201).json(newPositionHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới lịch sử vị trí công việc.',
            });
        }
    }

    async updatePositionHistoryEndDate(positionHistoryId) {
        try {
            const today = new Date();
            const updatedPositionHistory = await PositionHistory.findByIdAndUpdate(
                positionHistoryId,
                { end_date: today },
                { new: true },
            );
            console.log(' cập nhật endate lịch sử vị trí công việc thành công.');
            return updatedPositionHistory;
        } catch (error) {
            console.log('Đã xảy ra lỗi khi cập nhật endate lịch sử vị trí công việc.', error);
            throw new Error('Đã xảy ra lỗi khi cập nhật thông tin lịch sử vị trí công việc.');
        }
    }

    async deletePositionHistory(req, res, next) {
        try {
            const positionHistoryId = req.params.id;
            await PositionHistory.findByIdAndDelete(positionHistoryId);
            res.status(200).json({
                message: 'Lịch sử vị trí công việc đã được xóa thành công.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa lịch sử vị trí công việc.',
            });
        }
    }
}

module.exports = new PositionHistoryController();
