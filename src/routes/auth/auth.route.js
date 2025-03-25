import express from "express";
import {
  generateAuthToken,
  login,
  logout,
  register,
} from "../../controllers/v1/auth/index.js";

const router = express.Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// logout
router.post("/logout", logout);

export default router;
