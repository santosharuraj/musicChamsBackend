import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const TeacherModal = new mongoose.model("Teacher", schema);