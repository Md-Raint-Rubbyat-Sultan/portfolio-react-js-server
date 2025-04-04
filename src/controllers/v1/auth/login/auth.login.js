import User from "../../../../models/users/users.js";
import cookieOptions from "../../../../utils/cookieOptions.js";
import generateAuthToken from "../authToken/auth.generateToken.js";

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

    // token
    const token = await generateAuthToken(user?.email, "3d");

    res.cookie("auth-token", token, cookieOptions(3 * 24 * 60 * 60 * 1000));

    // response
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

export default login;
