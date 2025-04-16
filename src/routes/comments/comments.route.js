import express from "express";
import { getComments } from "../../controllers/v1/comments/index.js";
import { verifyAuthToken } from "../../middlewares/verifyToken.js";

const routes = express.Router();

// comment route
routes.get("/:projectId", getComments);

export default routes;
