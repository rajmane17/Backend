import { LIMIT } from './constants';
import express from 'express';
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

// setting up middlewares ==> These 5 middlewares are always required.
app.use(express.json(
    {
        limit: LIMIT
    }
));

app.use(express.urlencoded(
    {
        extended: true, 
        limit: LIMIT
    }
));

app.use(cors(
    {
    origin: process.env.ORIGIN,
    credentials: true,
    }
))

app.use(express.static("public"));

app.use(cookieParser());

export {app}