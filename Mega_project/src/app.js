import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { LIMIT } from './constants';

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


export {app}