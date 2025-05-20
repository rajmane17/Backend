import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import express from "express";
const app = express();

async function connectDb(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on((error) => {
            console.error(error);
        })
        console.log("mongodb connected");
        app.listen(process.env.PORT || 3000, () => {"server started on port ", process.env.PORT || 3000});
    } catch (error) {
        console.log("Error connecting the mongodb:- ", error);
        process.exit(1);
    }
}

export default connectDb;