import User from "../../../../models/users/users.js";
import cookieOptions from "../../../../utils/cookieOptions.js";
import generateAuthToken from "../authToken/auth.generateToken.js";

const register = async (req, res) => {
  try {
    const { email, fullName, password, profilePic, role, verificationCode } =
      req.body;

    const { key } = req.verify;

    // check is the code is valide
    if (isNaN(Number(verificationCode))) {
      return res.status(400).send({
        success: false,
        message: "Verification code must be a number",
      });
    }

    if (Number(verificationCode) !== Number(key))
      return res
        .status(401)
        .send({ success: false, message: "Invalide Code." });

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

    // set random profile if user didn't give one
    if (!profilePic) {
      req.body.profilePic = `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`;
    }

    const user = new User({
      fullName,
      email,
      password,
      profilePic,
      role,
      verify: true,
    });

    await user.save();

    // token
    const token = await generateAuthToken(user?.email, "3d");

    res.cookie("auth-token", token, cookieOptions(3 * 24 * 60 * 60 * 1000));

    // response
    res.status(200).send({
      message: "User register successfull.",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
        verify: user.verify,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default register;
