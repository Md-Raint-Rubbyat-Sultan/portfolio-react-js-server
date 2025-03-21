import express from "express";
import { adminInfo } from "../../controllers/v1/adminData/index.js";

const router = express.Router();

router.get("/", adminInfo);

export default router;
