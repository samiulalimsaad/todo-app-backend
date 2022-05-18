import mongoose from "mongoose";
const { model, Schema } = mongoose;
const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    { timestamps: true }
);

export const User = model("user", userSchema);
