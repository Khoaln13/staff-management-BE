//hàm connect to db
const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/staff-management');

        console.log('successfully connected');
    } catch (error) {
        console.log('fail to connect');
    }
}

module.exports = { connect };
