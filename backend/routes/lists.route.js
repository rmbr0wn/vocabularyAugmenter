import express from "express";

import { createList, getUserLists, changeListName, deleteList, deleteWord } from "../controllers/lists.controller.js";

var router = express.Router();

router.post("/create-list", createList);
router.get("/view-lists", getUserLists);
router.put("/change-list-name", changeListName);
router.put("/delete-word", deleteWord);
router.delete("/:id", deleteList);




export default router;
