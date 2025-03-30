const logout = async (req, res) => {
  try {
    res
      .clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
      })
      .send({ message: "Logout successfull.", success: true });
  } catch (error) {
    res.status(500).send({ message: "internal server error", success: false });
  }
};

export default logout;
