import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		classCount: {
			type: Boolean,
			default: false,
		},
		meetingLink: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const TeacherModal = new mongoose.model("Teacher", schema);

export default TeacherModal;
