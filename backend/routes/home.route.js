import express from "express";

import { generateGoogleProfile, getGoogleProfile } from "../controllers/home.controller.js";

var router = express.Router();

router.post("/generate", generateGoogleProfile);
router.get("/:id", getGoogleProfile);

export default router;
