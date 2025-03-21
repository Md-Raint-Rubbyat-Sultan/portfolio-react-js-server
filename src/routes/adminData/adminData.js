import express from "express";
import { adminInfo, adminTech } from "../../controllers/v1/adminData/index.js";

const router = express.Router();

router.get("/", adminInfo);
router.get("/adminTech", adminTech);

export default router;
