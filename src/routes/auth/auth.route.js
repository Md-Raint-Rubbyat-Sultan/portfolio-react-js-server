import express from "express";
import {
  checkAuth,
  login,
  googleLogin,
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
router.post("/verify-email", verifyEmail);

// register user
router.post("/register", verifyVerificationToken, register);

// login user
router.post("/login", login);

// login user with Google
router.post("/login-with-google", googleLogin);

// check auth
router.get("/check-auth", verifyAuthToken, checkAuth);

// logout
router.post("/logout", logout);

export default router;
