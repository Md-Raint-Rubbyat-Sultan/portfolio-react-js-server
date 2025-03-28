import generateAuthToken from "./authToken/auth.generateToken.js";
import register from "./register/auth.register.js";
import login from "./login/auth.login.js";
import logout from "./logout/auth.logout.js";
import verifyEmail from "./emailVerification/auth.verifyEmail.js";
import checkAuth from "./checkAuth/auth.CheckAuth.js";

export { generateAuthToken, register, login, logout, verifyEmail, checkAuth };
