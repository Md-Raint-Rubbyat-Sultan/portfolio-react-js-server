import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
} from "../../controllers/v1/auth/index.js";
import { verifyVerificationToken } from "../../middlewares/verifyToken.js";

const router = express.Router();

// register user
router.post("/register", verifyVerificationToken, register);

// login user
router.post("/login", login);

// logout
router.post("/logout", logout);

// verify email
router.post("/verify-mail", verifyEmail);

export default router;
