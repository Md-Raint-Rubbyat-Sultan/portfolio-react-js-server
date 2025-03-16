import express from "express";
import {
  allProjects,
  singleProject,
} from "../../controllers/v1/projects/index.js";

const router = express.Router();

router.get("/all-projects", allProjects);
router.get("/:id", singleProject);

export default router;
