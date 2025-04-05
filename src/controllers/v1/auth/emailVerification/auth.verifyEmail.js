import nodemailer from "nodemailer";
import dotenv from "dotenv";
import randomNumder from "../../../../utils/randomNumberCode.js";
import generateAuthToken from "../authToken/auth.generateToken.js";
import User from "../../../../models/users/users.js";
import cookieOptions from "../../../../utils/cookieOptions.js";

dotenv.config();

const myEmail = process.env.APP_EMAIL;

const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).send({ message: "Email address not found." });
    }

    const service = email.split("@").pop().split(".")[0];

    const random = await randomNumder();

    // is user exist
    const isUserExist = await User.findOne({ email });

    if (isUserExist?.verify || isUserExist)
      return res
        .status(400)
        .send({ message: "User already exists with this email." });

    const transporter = nodemailer.createTransport({
      service,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL,
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
        res.status(400).send({
          success: false,
          message: `failed to send email to ${email}`,
        });
      } else {
        // generate verification token
        const token = await generateAuthToken(random, "2m");

        // send it as cookie
        res.cookie("verification-token", token, cookieOptions(2 * 60 * 1000));

        // send the info to client
        res
          .status(201)
          .send({ ...info, message: `verfication email send to ${email}` });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default verifyEmail;
