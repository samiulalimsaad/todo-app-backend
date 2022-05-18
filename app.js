import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Todo } from "./Models/todo.model.jsodel.js";

const app = express();
const PORT = process.env.PORT || 5000;

//  middleWares
// enable cors
app.use(cors());
app.use(express.json());

const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "unauthorized access",
        });
    }
    const token = authHeader.split(" ")[1];
    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Forbidden access",
            });
        }
        req.email = decoded?.email;
        next();
    });
};

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

app.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({ todo, success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.post("/login", async (req, res) => {
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
    });
    res.json({
        token,
        success: true,
    });
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
