import express from "express";
import auth from "../middleware/auth.middleware.js";

import { changeUsername } from "../controllers/profile.controller.js";

var router = express.Router();

router.put("/change-name", changeUsername);

export default router;
