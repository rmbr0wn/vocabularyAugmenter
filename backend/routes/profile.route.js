import express from "express";

import { changeUsername } from "../controllers/profile.controller.js";

var router = express.Router();

router.put("/change-name", changeUsername);

export default router;
