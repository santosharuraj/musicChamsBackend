import AdminModal from "../model/AdminModal.js";
import bcrypt from "bcrypt";
export const registerAdmin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const is_admin_exist = await AdminModal.findOne({ email });
        if (is_admin_exist) {
            return res.status(404).json("already admin exist");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new AdminModal({...req.body, password: hashPassword });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const loginAdmin = async(req, res) => {
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