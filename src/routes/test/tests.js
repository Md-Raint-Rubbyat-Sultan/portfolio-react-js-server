import express from "express";
import { health } from "../../controllers/v1/test/index.js";

const router = express.Router();

router.get("/health", health);

export default router;
