const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const positionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    { collection: 'positions' },
);

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
