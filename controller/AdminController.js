import AdminModal from "../model/AdminModal.js";
import StudentModal from "../model/StudentModal.js";
import TeacherModal from "../model/TeacherModal.js";
import bcrypt from "bcrypt";
import mongoose, { get } from "mongoose";

export const registerAdmin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const is_admin_exist = await AdminModal.findOne({ email });
		if (is_admin_exist) {
			return res.status(404).json("already admin exist");
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newAdmin = new AdminModal({ ...req.body, password: hashPassword });
		await newAdmin.save();
		res.status(201).json(newAdmin);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const loginAdmin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const is_admin_exist = await AdminModal.findOne({ email });
		if (is_admin_exist) {
			const is_password_matched = await bcrypt.compare(
				password,
				is_admin_exist.password
			);
			if (is_password_matched) {
				return res.status(200).json(is_admin_exist);
			} else {
				return res.status(401).json("unauthorized admin");
			}
		} else {
			return res.status(401).json("Admin doest not exist");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

export const createStudent = async (req, res) => {
	const id = req.params.id;
	const { teacherEmail } = req.body;
	try {
		const is_admin_exist = await AdminModal.findById(id);
		if (!is_admin_exist) {
			return res.status(404).json("Admin doest not exist");
		}
		const teacher_email_exist = await TeacherModal.findOne({
			email: teacherEmail,
		});

		if (!teacher_email_exist) {
			return res.status(404).json("Teacher email dost not exist");
		}
		const newStudent = new StudentModal(req.body);
		await newStudent.save();
		res.status(201).json(newStudent);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllStudent = async (req, res) => {
	try {
		const all_students = await StudentModal.find().sort({ createdAt: -1 });
		res.status(200).json(all_students);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updateStudent = async (req, res) => {
	const id = req.params.id;
	const { studentId } = req.body;
	try {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const exist = await AdminModal.findById(id);
			if (!exist) {
				return res.status(404).json("Admin doest not exist");
			}

			const updated_student = await StudentModal.findByIdAndUpdate(
				studentId,
				req.body,
				{
					new: true,
				}
			);

			res.status(200).json(updated_student);
		} else {
			res.status(404).json("Invalid ObjectId");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

export const createTeacher = async (req, res) => {
	const id = req.params.id;
	try {
		const is_admin_exist = await AdminModal.findById(id);
		if (!is_admin_exist) {
			return res.status(404).json("Admin doest not exist");
		}

		const newTeacher = new TeacherModal(req.body);
		await newTeacher.save();
		res.status(201).json(newTeacher);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getAllTeacher = async (req, res) => {
	try {
		const all_teachers = await TeacherModal.find().sort({ created: -1 });
		res.status(200).json(all_teachers);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updateTeacher = async (req, res) => {
	const id = req.params.id;
	const { teacherId } = req.body;
	try {
		if (mongoose.Types.ObjectId.isValid(id)) {
			const exist = await AdminModal.findById(id);
			if (!exist) {
				return res.status(404).json("Admin doest not exist");
			}

			const updated_teacher = await TeacherModal.findByIdAndUpdate(
				teacherId,
				req.body,
				{
					new: true,
				}
			);

			res.status(200).json(updated_teacher);
		} else {
			res.status(404).json("Invalid ObjectId");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

export const teacherAssigned = async (req, res) => {
	const email = req.params.email;
	try {
		const getall = await StudentModal.find({ teacherEmail: email }).sort({
			createdAt: -1,
		});
		res.status(200).json(getall);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const singleStudent = async (req, res) => {
	const userId = req.params.userId;
	try {
		const student = await StudentModal.findById(userId);
		if (student) {
			res.status(200).json(student);
		} else {
			res.status(404).json("Student not exist");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
