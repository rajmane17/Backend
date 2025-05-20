require("dotenv").config({path: "./env"})

import connectDb from "./db/connect"

dotenv.config({
    path: './env',
})

connectDb();