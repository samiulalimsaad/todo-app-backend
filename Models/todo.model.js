import mongoose from "mongoose";
const { model, Schema } = mongoose;
const todoSchema = new Schema(
    {
        title: String,
        description: String,
        done: Boolean,
        email: String,
    },
    { timestamps: true }
);

export const Todo = model("todo", todoSchema);
