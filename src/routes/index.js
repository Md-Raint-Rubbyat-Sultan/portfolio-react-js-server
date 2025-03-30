import express from "express";
import test from "./test/tests.js";
import projects from "./projects/projects.js";
import adminData from "./adminData/adminData.js";
import auth from "./auth/auth.route.js";
import facebookDeletion from "../utils/facebookDeletion.js";

const router = express.Router();

// Use test routes
router.use("/tests", test);

// Use project routes
router.use("/projects", projects);

// Use admin info routes
router.use("/adminData", adminData);

// auth routes
router.use("/auth", auth);

// facebook app for auth connection
router.use("/facebook-deletion", facebookDeletion);
export default router;
