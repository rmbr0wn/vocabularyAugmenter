import express from "express";

import { signIn, signUp} from "../controllers/user.controller.js";
import User from "../models/user.model.js";
import auth from "../middleware/auth.middleware.js";

var router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

export default router;
