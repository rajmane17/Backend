import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { LIMIT } from './constants';

// Middlewares
app.use(express.json({
    limit: LIMIT,
}));

app.use(express.urlencoded({ 
    extended: true, 
    limit: LIMIT 
}));

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(cookieParser());

app.use(express.static("public"));

// Route imports
import userRoute from "./routes/user.routes.js"

// routes
app.use("/api/v1/user", userRoute)


export {app}