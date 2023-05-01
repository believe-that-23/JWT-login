const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/jwt');
        if (con) {
            console.log('database connected');
        } else {
            console.log('not connected');
        }
    } catch (error) {
        console.log('something went wrong');
        process.exit();
    }
}


module.exports = connectDb;