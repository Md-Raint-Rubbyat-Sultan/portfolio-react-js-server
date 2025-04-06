import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const stringTypeRequired = { type: String, required: true, trim: true };
const regex = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^.{6,}$/,
  fullName: /^.{2,}$/,
};

const usersSchema = new Schema(
  {
    fullName: {
      ...stringTypeRequired,
      match: [regex.fullName, "Password must contain at least 2 characters"],
    },
    email: {
      ...stringTypeRequired,
      unique: true,
      lowercase: true, // Ensure emails are stored in lowercase
      match: [regex.email, "Please enter a valid email"],
    },
    password: {
      ...stringTypeRequired,
      trim: false,
      match: [regex.password, "Password must contain at least 6 characters"],
    },
    profilePic: {
      url: {
        type: String,
        default: "https://api.dicebear.com/9.x/avataaars/svg",
      },
      deleteUrl: { type: String, default: "" },
    },
    role: {
      ...stringTypeRequired,
      default: "user",
      enum: ["user", "admin"], // Restrict to specific roles
    },
    verify: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  // Only hash if password was modified
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

usersSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

const User = model("User", usersSchema);

export default User;
