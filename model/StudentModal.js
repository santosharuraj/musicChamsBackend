import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
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
		},
		time: {
			type: String,
		},
		noClasses: {
			type: String,
		},
		instrumentName: {
			type: String,
		},
		completedClasses: {
			type: String,
		},
		meetingLink: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const StudentModal = new mongoose.model("Student", schema);

export default StudentModal;
