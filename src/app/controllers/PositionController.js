const Position = require('../models/Position');

class PositionController {
    async getAllPositions(req, res, next) {
        try {
            const positions = await Position.find({});
            res.status(200).json(positions);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu vị trí công việc.',
            });
        }
    }

    async getAllPositionTitle(req, res, next) {
        try {
            const positions = await Position.find({}, 'title');
            const positionTitles = positions.map(position => position.title);
            res.status(200).json(positionTitles);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy dữ liệu vị trí công việc.',
            });
        }
    }

    async getPositionById(req, res, next) {
        try {
            const position = await Position.findById(req.params.id);
            if (!position) {
                return res
                    .status(404)
                    .json({ message: 'Không tìm thấy vị trí công việc.' });
            }
            res.status(200).json(position);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi lấy thông tin vị trí công việc.',
            });
        }
    }

    async createPosition(req, res, next) {
        try {
            const { title } = req.body;
            const newPosition = new Position({ title });
            await newPosition.save();
            res.status(201).json(newPosition);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi tạo mới vị trí công việc.',
            });
        }
    }

    async updatePosition(req, res, next) {
        try {
            const positionId = req.params.id;
            const { title } = req.body;
            const updatedPosition = await Position.findByIdAndUpdate(
                positionId,
                { title },
                { new: true },
            );
            res.status(200).json(updatedPosition);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message:
                    'Đã xảy ra lỗi khi cập nhật thông tin vị trí công việc.',
            });
        }
    }

    async deletePosition(req, res, next) {
        try {
            const positionId = req.params.id;
            await Position.findByIdAndDelete(positionId);
            res.status(200).json({
                message: 'Vị trí công việc đã được xóa thành công.',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Đã xảy ra lỗi khi xóa vị trí công việc.',
            });
        }
    }
}

module.exports = new PositionController();
