//hàm connect to db
const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/staff-management');
        //mongoose.connect('mongodb://username:password@host:port/database');
        console.log('successfully connected');
    } catch (error) {
        console.log('fail to connect');
    }
}

module.exports = { connect };
