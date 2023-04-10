import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import AdminRoute from "./routes/AdminRoute.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;
const URL = process.env.DB_URL;
mongoose
    .connect(URL, { useNewUrlParser: true })
    .then((result) => {
        app.listen(PORT, () => {
            console.log("Connected server");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api/v1/admin", AdminRoute);