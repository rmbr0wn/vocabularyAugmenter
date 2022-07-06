import express from "express";
import auth from "../middleware/auth.middleware.js";

import { getThesaurusWord, getListNames, addToList } from "../controllers/wordExplorer.controller.js";

var router = express.Router();

router.get(`/get-word`, auth, getThesaurusWord);
router.get(`/list-names`, auth, getListNames);
router.put(`/add-word`, auth, addToList);

export default router;
