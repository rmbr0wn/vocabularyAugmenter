import express from "express";

import { createList, getUserLists, changeListName } from "../controllers/lists.controller.js";

var router = express.Router();

router.post("/create-list", createList);
router.get("/view-lists", getUserLists);
router.put("/change-list-name", changeListName);




export default router;
