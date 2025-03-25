import User from "../../../../models/users/users.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // email & password validate
    if (!email || !password)
      return res
        .status(400)
        .send({ message: "invalid credentials. Must fill every field" });

    // is user exist
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ message: "User dose not exists." });

    // check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return res.status(400).send({ message: "invalid credentials." });

    res.status(200).send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

export default login;
