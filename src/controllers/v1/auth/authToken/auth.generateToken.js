import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAuthToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email)
      return res
        .status(400)
        .send({ message: "invalid credentials. Unable to have a token." });

    const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: "3d" });

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
    next(error);
  }
};

export default generateAuthToken;
