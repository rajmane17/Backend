import mongoose from 'mongoose';
import { DB_Name } from '../constants.js';
import express from "express"
const app = express();

async function connectDB () {
    try {
            // Yaha pr database connect hogaya
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
            // This means that database is connected but our express can't talk with database
            app.on("error", (error) => {
                console.log(error);
                throw error;
            })
            console.log(`MongoDb connected. \n DB HOST: ${connectionInstance.connection.host}`);
            // Listening
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server started on PORT: ${process.env.PORT || 8000}`);
            })
    } catch (error) {
        console.log("Couldn't connect to database", error);
        // Explore process.exit();
        process.exit(1);
    }
}

export default connectDB;