import mongoose from "mongoose";
const { model, Schema } = mongoose;
const todoSchema = new Schema(
    {
        name: Boolean,
        email: Boolean,
        password: Boolean,
    },
    { timestamps: true }
);

export const Todo = model("todo", todoSchema);
