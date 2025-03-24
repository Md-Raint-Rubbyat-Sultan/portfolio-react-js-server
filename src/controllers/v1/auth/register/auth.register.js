import User from "../../../../models/users/users.js";

const register = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  try {
    // email validate
    if (!email)
      return res
        .status(400)
        .send({ message: "invalid credentials. Must fill every field" });

    // fullName validate
    if (!fullName)
      return res
        .status(400)
        .send({ message: "invalid credentials. Must fill every field" });

    // password validate
    if (!password)
      return res
        .status(400)
        .send({ message: "invalid credentials. Must fill every field" });

    if (password.length < 6)
      return res
        .status(400)
        .send({ message: "Password must be greater than 6 charecter." });

    if (!profilePic) {
      profilePic = `https://api.dicebear.com/9.x/avataaars/svg/seed=${fullName}`;
    }

    const user = await new User({
      fullName,
      email,
      password,
      profilePic,
    });

    user.save();
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

export default register;
