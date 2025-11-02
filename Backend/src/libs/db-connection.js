const mongoose = require('mongoose')
const ENV = require('./ENV')

const Database_connection = async()=>{
    try {
        const connection = await mongoose.connect(ENV.DATABASE_URL);
        console.log('database connected')
    } catch (error) {
        console.log("The Database connection error: ".error);
        process.exit(1);
    }
}

module.exports = Database_connection;