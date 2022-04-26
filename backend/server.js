import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
import homeRouter from "./routes/home.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully!");
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
