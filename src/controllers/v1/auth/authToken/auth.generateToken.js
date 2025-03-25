import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAuthToken = async (email) => {
  try {
    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });

    return token;
  } catch (error) {
    return error;
  }
};

export default generateAuthToken;
