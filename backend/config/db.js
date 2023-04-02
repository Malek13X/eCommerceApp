const mongoose = require('mongoose');

mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`-MongoDB Connected ${conn.connection.host}`.bold.bgCyan.grey)
    } catch (error) {
        console.log(error.bgRed.black)    
        process.exit(1)
    }
}

module.exports = connectDB