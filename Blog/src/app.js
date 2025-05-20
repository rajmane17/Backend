import express from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from "cors"

// middlewares
app.use(express.json({
    limit: process.env.LIMIT
}));
app.use(express.urlencoded({
    extended:true, 
    limit:process.env.LIMIT
}));
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.static("public"))

// route-imports
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/user.route.js"

// route-setup
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
