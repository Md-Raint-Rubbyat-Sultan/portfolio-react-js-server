import express from "express";
import test from "./test/tests.js";
import projects from "./projects/projects.js";
import adminData from "./adminData/adminData.js";

const router = express.Router();

// Use test routes
router.use("/tests", test);

// Use project routes
router.use("/projects", projects);

// Use admin info routes
router.use("/adminData", adminData);
export default router;
