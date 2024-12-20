const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {checkAuth} = require("./middlewares/auth")

// route imports
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

// connection
mongoose.connect("mongodb://127.0.0.1:27017/MyDB")
.then(() => console.log("DB connected"))
.catch((error) => console.log("Failed to connect DB", error))

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/", staticRoute);
app.use("/user", checkAuth, userRoute);

// listen
app.listen(PORT, () => {console.log(`Server Started on Port: ${PORT}`)});