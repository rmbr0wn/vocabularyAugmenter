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

app.use(cors());
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

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
