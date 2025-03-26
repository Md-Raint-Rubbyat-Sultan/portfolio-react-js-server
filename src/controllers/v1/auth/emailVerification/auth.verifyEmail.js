import nodemailer from "nodemailer";
import dotenv from "dotenv";
import randomNumder from "../../../../utils/randomNumberCode.js";
import generateAuthToken from "../authToken/auth.generateToken.js";

dotenv.config();

const myEmail = "mdranitrubbyatsultan@gmail.com";

const verifyEmail = async (req, res) => {
  const { email } = req.body;

  const random = randomNumder();

  try {
    if (!email) {
      return res.status(400).send({ message: "Email address not found." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: myEmail,
      to: email,
      subject: "Your email verification code",
      html: `<div style="text-align: center">
      <h1>Verification Code</h1>
      <p
        style="
          padding: 12px;
          font-size: 24px;
          background-color: aliceblue;
          color: black;
          display: inline-block;
        "
      >
        ${random}
      </p>
    </div>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        res.status(400).send({ message: `failed to send email to ${email}` });
      } else {
        // generate verification token
        const token = await generateAuthToken(random, "3d");
        // send it as cookie
        res.cookie("verification-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3 * 24 * 60 * 60 * 1000, // 3 day in milisecond
        });

        // send the info to client
        res
          .status(201)
          .send({ ...info, message: "verfication email and token send." });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default verifyEmail;
