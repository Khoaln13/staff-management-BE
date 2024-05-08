const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { collection: 'accounts' },
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
