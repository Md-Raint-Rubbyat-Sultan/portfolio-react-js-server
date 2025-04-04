import cookieOptions from "../../../../utils/cookieOptions.js";

const logout = async (_, res) => {
  try {
    res
      .clearCookie("auth-token", cookieOptions(0))
      .send({ message: "Logout successfull.", success: true });
  } catch (error) {
    res.status(500).send({ message: "internal server error", success: false });
  }
};

export default logout;
