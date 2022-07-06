import express from "express";
import auth from "../middleware/auth.middleware.js";

import { createList, getUserLists, changeListName, deleteList, deleteWord } from "../controllers/lists.controller.js";

var router = express.Router();

router.post("/create-list", auth, createList);
router.get("/view-lists", auth, getUserLists);
router.put("/change-list-name", auth, changeListName);
router.put("/delete-word", auth, deleteWord);
router.delete("/:id", auth, deleteList);




export default router;
