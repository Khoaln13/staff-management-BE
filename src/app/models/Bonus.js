const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BonusSchema = new Schema({
    employee_id: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    amount: { type: Number, required: true },
    reason: { type: String },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Bonus', BonusSchema);
