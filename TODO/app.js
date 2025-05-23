require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkAuthenticationOfCookie, checkAuth } = require("./middlewares/auth");
const TODO = require("./models/todo");

//route imports
const userRoute = require("./routes/user");
const todoRoute = require("./routes/todo");


//connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// If the user is logged in then this middleware will give us req.user
app.use(checkAuthenticationOfCookie("token"))
app.use(express.static(path.resolve("./public")));

//routes
app.get("/", async (req, res) => {

    if (req.user) {
        const userId = req.user._id;
        try {
            const allTodos = await TODO.find({ createdBy: userId });
            res.render("home", {
                user: req.user,
                allTodos: allTodos
            })
        } catch (error) {
            console.log(error);
        }
    } else {
        return res.render("home", {
            message: "please login to create your Todo List"
        })
    }
})
app.use("/user", userRoute);
app.use("/todo", checkAuth, todoRoute);


app.listen(PORT, () => {
    console.log("Server started on port: ", PORT);
})