import express from "express";
import { loginAdmin, registerAdmin } from "../controller/AdminController.js";

const route = express.Router();
route.post("/register", registerAdmin);
route.post("/login", loginAdmin);
export default route;