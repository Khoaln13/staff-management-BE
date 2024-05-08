//hàm connect to db
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        //mongoose.connect('mongodb://username:password@host:port/database');
        console.log('successfully connected');
    } catch (error) {
        console.log('fail to connect');
    }
}

module.exports = { connect };
//lengockhoa1404
//lengockhoa@1

//mongodb+srv://lengockhoa1404:lengockhoa@1@clusterlnk-staffmanage.xwls6kf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLNK-staffManage
//mongodb+srv://lengockhoa1404:<password>@clusterlnk-staffmanage.xwls6kf.mongodb.net/