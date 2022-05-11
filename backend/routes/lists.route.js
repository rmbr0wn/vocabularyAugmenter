import express from "express";

import { createList, getUserLists } from "../controllers/lists.controller.js";

var router = express.Router();

router.post("/create-list", createList);
router.get("/view-lists", getUserLists);
// router.get("/:id", getUserLists);

// router.put("/update-list", );
// router.get("delete-list", );



export default router;
