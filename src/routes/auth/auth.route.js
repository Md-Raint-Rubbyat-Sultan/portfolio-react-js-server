import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  verifyEmail,
} from "../../controllers/v1/auth/index.js";
import {
  verifyAuthToken,
  verifyVerificationToken,
} from "../../middlewares/verifyToken.js";

const router = express.Router();

// verify email
router.post("/verify-mail", verifyEmail);

// register user
router.post("/register", verifyVerificationToken, register);

// login user
router.post("/login", login);

// check auth
router.post("/check-auth", verifyAuthToken, checkAuth);

// logout
router.post("/logout", logout);

export default router;
