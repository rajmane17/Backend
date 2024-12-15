const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require("mongoose");

// route imports
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/userRoute");

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

// routes
app.use("/", staticRoute);
app.use("/user", userRoute);

// listen
app.listen(PORT, () => {console.log(`Server Started on Port: ${PORT}`)});