import User from "../../../../models/users/users.js";
import generateAuthToken from "../authToken/auth.generateToken.js";

const register = async (req, res) => {
  const { email, fullName, password, profilePic, role } = req.body;

  try {
    // email & fullName & password validate
    if (!email || !fullName || !password)
      return res
        .status(400)
        .send({ message: "invalid credentials. Must fill every field" });

    // password validate
    if (password.length < 6)
      return res
        .status(400)
        .send({ message: "Password must be greater than 6 charecter." });

    // is user exist
    const isUserExist = await User.findOne({ email });

    if (isUserExist)
      return res
        .status(400)
        .send({ message: "User already exists with this email." });

    if (!profilePic) {
      req.body.profilePic = `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`;
    }

    const user = new User({
      fullName,
      email,
      password,
      profilePic,
      role,
    });

    await user.save();

    // token
    const token = await generateAuthToken(user?.email);

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // response
    res.status(200).send({
      message: "User register successfull.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

export default register;
