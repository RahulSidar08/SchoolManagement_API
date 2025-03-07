import express from "express"
const router = express.Router();
import { addSchool, listSchools } from "../controllers/schoolControllers.js";
router.post("/addSchool",addSchool)
router.get("/listSchools",listSchools)

export default router;