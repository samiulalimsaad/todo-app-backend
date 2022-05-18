import mongoose from "mongoose";
const { model, Schema } = mongoose;
const todoSchema = new Schema(
    {
        title: String,
        description: String,
        done: Boolean,
        name: Boolean,
        email: Boolean,
        password: Boolean,
    },
    { timestamps: true }
);

export const Todo = model("todo", todoSchema);
