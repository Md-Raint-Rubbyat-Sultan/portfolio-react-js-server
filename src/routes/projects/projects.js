import express from "express";
import {
  allProjects,
  portfolioImg,
  singleProject,
} from "../../controllers/v1/projects/index.js";

const router = express.Router();

router.get("/all-projects", allProjects);
router.get("/portfolio-img", portfolioImg);
router.get("/:id", singleProject);

export default router;
