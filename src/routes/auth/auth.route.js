import express from "express";
import {
  generateAuthToken,
  login,
  register,
} from "../../controllers/v1/auth/index.js";

const router = express.Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// generate token for authenticte user
// router.post("/auth-token", generateAuthToken);

export default router;
