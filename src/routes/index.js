import express from "express";
import test from "./test/tests.js";

const router = express.Router();

// Use test routes
router.use("/tests", test);

export default router;
