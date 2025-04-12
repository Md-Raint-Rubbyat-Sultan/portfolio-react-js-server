import User from "../../../../models/users/users.js";
import cookieOptions from "../../../../utils/cookieOptions.js";
import generateAuthToken from "../authToken/auth.generateToken.js";

const googleLogin = async (req, res) => {
  try {
    const { fullName, email, profilePic, verify, role } = req.body;

    if (!email || !fullName)
      return res.status(400).send({ message: "Somthing went wrong!" });

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      // token
      const token = await generateAuthToken(email, "3d");
      res.cookie("auth-token", token, cookieOptions(3 * 24 * 60 * 60 * 1000));
      res.status(200).send({ message: "Login Successfull!" });
      return;
    }

    let newProfile = {
      url: profilePic,
      deleteUrl: "",
    };

    if (!newProfile) {
      newProfile = {
        url: `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`,
        deleteUrl: "",
      };
    }

    const user = new User({
      fullName,
      email,
      password: "Social Login",
      profilePic: newProfile,
      role,
      verify,
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
    console.log(error);
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default googleLogin;
