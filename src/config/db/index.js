//hàm connect to db
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect() {

    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);

        //mongoose.connect('mongodb://username:password@host:port/database');
        console.log('successfully connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };
