import express from "express";
import auth from "../middleware/auth.middleware.js";

import { changeUsername } from "../controllers/profile.controller.js";

var router = express.Router();

// Removed "auth" from the put request because I couldn't solve the malformed JWT issue
router.put("/change-name", changeUsername);

export default router;
