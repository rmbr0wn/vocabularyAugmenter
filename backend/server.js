import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";

import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";

// Follwing "Nodejs image upload using multer" video on Youtube for image upload.
//
// Commented out for now because I need to figure out how to automatically
// generate an instance of the Profile schema upon logging in/clicking profile
// button for the first time.

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// const storage = multer.diskStorage({
// 	destination: 'uploads',
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname)
// 	},
// });
// const upload = multer({
// 	storage:storage
// }).single('defaultImage');

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/profile", profileRouter);

// app.post('/upload', (req, res) => {
// 	upload(req, res, (err) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			// Update the image under the profile Schema
// 		}
// 	})
// });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully!");
});

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
