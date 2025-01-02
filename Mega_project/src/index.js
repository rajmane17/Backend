// require("dotenv").config({path: "./env"})
import dotenv from 'dotenv';

import connectDB from './db/connect.js';

//Specify a custom path if your file containing environment variables is located elsewhere.
dotenv.config({
    path: './env',
})

connectDB();





/*

const app = express();
;( async () => {
    try {
        // Yaha pr database connect hogaya
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        // This means that database is connected but our express can't talk with database
        app.on("error", (error) => {
            console.log(error);
        })
        // Listening
        app.listen(process.env.PORT, () => {
            console.log(`Server started on PORT: ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error);
    }
}) ()

*/