require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const DB_Name = require("../constants")
const app = express();

async function connectDb() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        app.on("error", (err) => {
            console.log("ERROR: ", err);
        })
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("couldn't connect to db: ", error);
    }
}

module.exports = {connectDb};