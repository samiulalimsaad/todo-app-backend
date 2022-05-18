import cors from "cors";
import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Todo } from "./todo.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

//  middleWares
// enable cors
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const allTodo = await Todo.find({});
        res.json({ allTodo, success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.get("/:id", async (req, res) => {
    try {
        const allTodo = await Todo.findById({ _id: req.params.id || "" });
        res.json({ allTodo, success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        const todo = await newTodo.save();
        res.json({ todo, success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.patch("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json({ todo, success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(PORT, async () => {
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(
        process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
        },
        () => {
            console.log("Database is connected");
        }
    );
});
