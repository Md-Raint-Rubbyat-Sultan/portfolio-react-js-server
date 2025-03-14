import express from "express";
import test from "./test/tests.js";
import projects from "./projects/projects.js";

const router = express.Router();

// Use test routes
router.use("/tests", test);

// Use project routes
router.use("/projects", projects);

export default router;
