import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAuthToken = (req, res, next) => {
  try {
    const token = req?.cookies["auth-token"];

    if (!token)
      return res
        .status(401)
        .send({ message: "Unauthorized user, please login.", success: false });

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error)
        return res.status(403).send({
          message: "Unauthorized user, please login.",
          success: false,
        });
      req.user = decoded;

      next();
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

const verifyVerificationToken = (req, res, next) => {
  try {
    const token = req?.cookies["verification-token"];

    if (!token)
      return res
        .status(401)
        .send({ success: false, message: "Invalide Code." });

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error)
        return res
          .status(401)
          .send({ success: false, message: "Invalide Code." });
      req.verify = decoded;

      next();
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export { verifyAuthToken, verifyVerificationToken };
