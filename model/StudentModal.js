import mongoose from "mongoose";

const schema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    studentEmail: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    teacherEmail: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    noClasses: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const StudentModal = new mongoose.model("Student", schema);