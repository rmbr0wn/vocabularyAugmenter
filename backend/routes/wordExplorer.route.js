import express from "express";

import { getThesaurusWord } from "../controllers/wordExplorer.controller.js";

var router = express.Router();

// TODO: Need to figure out how to slip ${word} in there (might not be in this file).
router.get(`/get-word`, getThesaurusWord);


export default router;
