const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("DB connected");

    } catch (error) {
        return console.log(error.message)
    }
}

module.exports = connectDB;