import express from "express";
import {
	createStudent,
	createTeacher,
	getAllStudent,
	getAllTeacher,
	loginAdmin,
	registerAdmin,
	singleStudent,
	teacherAssigned,
	updateStudent,
	updateTeacher,
} from "../controller/AdminController.js";

const route = express.Router();
//auth
route.post("/register", registerAdmin);
route.post("/login", loginAdmin);

//student
route.post("/create_student/:id", createStudent);
route.put("/update_student/:id", updateStudent);
route.get("/get_all_students", getAllStudent);
route.get("/get_a_student/:userId", singleStudent);

//teacher
route.post("/create_teacher/:id", createTeacher);
route.put("/update_teacher/:id", updateTeacher);
route.get("/get_all_teacher", getAllTeacher);
route.get("/get_all_assined_teacher/:email", teacherAssigned);
export default route;
