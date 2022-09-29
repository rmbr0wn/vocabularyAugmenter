import { TextEncoder, TextDecoder } from "util";
import path from "path";
import {fileURLToPath} from "url";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
import homeRouter from "./routes/home.route.js";
import exploreRouter from "./routes/wordExplorer.route.js";
import listsRouter from "./routes/lists.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var corsOptions = {
    origin: ['http://localhost:5000', 'http://localhost:5000/user/sign-in', 'https://vocabularyaugmenter.herokuapp.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'] };

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/explore", exploreRouter);
app.use("/lists", listsRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully!");
});

if (process.env.NODE_ENV === "production") {
	console.log(path.join(__dirname, "../client/build"));
	app.use(express.static(path.join(__dirname, "../client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	})
} else {
	app.get("/", (req, res) => {
		res.send("API running.");
	});
}

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
