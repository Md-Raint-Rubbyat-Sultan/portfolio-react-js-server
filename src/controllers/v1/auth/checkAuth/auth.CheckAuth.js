import User from "../../../../models/users/users.js";

const checkAuth = async (req, res) => {
  const { key } = req.user;
  try {
    const user = await User.findOne({ email: key });

    if (!user?.email)
      return res.status(400).send({ message: "User don't exist." });

    if (user?.email !== key)
      return res.status(403).send({ message: "Forbidden access." });

    res.status(200).send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      verify: user.verify,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default checkAuth;
