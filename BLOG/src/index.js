import dotenv from 'dotenv';

const {connectDb} = require("./db/connect")

dotenv.config({
    path: './env',
})

// connection
connectDb()