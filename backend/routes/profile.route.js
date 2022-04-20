import express from "express";

import { generateProfile, changeImage, changeUsername } from "../controllers/profile.controller.js";
import Profile from "../models/profile.model.js";

var router = express.Router();

router.post("/generate", generateProfile);
router.post("/upload", changeImage);
router.post("/change-name", changeUsername);

export default router;
