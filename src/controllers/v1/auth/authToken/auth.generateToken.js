import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAuthToken = async (key, expires) => {
  try {
    const token = jwt.sign({ key }, process.env.SECRET_KEY, {
      expiresIn: expires,
    });

    return token;
  } catch (error) {
    return error;
  }
};

export default generateAuthToken;
