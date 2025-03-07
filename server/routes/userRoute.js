import express from "express"
const router = express.Router();
import { addSchool, getAllSchools, listSchools } from "../controllers/schoolControllers.js";
router.post("/addSchool",addSchool)
router.get("/allSchools",getAllSchools)
router.get("/listSchools",listSchools)

export default router;