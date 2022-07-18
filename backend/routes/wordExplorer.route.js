import express from "express";
import auth from "../middleware/auth.middleware.js";

import { getThesaurusWord, getListNames, addToList } from "../controllers/wordExplorer.controller.js";

var router = express.Router();

router.get(`/get-word`, getThesaurusWord);
router.get(`/list-names`, getListNames);
router.put(`/add-word`, addToList);

export default router;
