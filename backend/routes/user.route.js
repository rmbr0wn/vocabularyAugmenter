import express from "express";

import { signIn, signUp } from "../controllers/user.controller.js";

var router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

export default router;
