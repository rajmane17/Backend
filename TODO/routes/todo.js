const express = require("express");
const router = express.Router();
const USER = require("../models/user");
const TODO = require("../models/todo");

router.get("/add-todo", (req, res) => {
    console.log(req.body);
    res.render("addtodo", {
        user: req.user
    });
})

router.post("/add-todo", async (req, res) => {
    await TODO.create({
        todo: req.body.todo,
        createdBy: req.user._id
    })

    return res.redirect("/")
})

router.get("/delete-todo/:todoId", async (req, res) => {
    const {todoId} = req.params;
    const getTodo = await TODO.findByIdAndDelete({_id: todoId})

    if( !getTodo ) {
        return res.status(404).send("Todo not found");
    }
    return res.redirect("/")
})


module.exports = router