import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const stringTypeRequired = { type: String, required: true };

const usersSchema = new Schema({
  fullName: stringTypeRequired,
  email: {
    ...stringTypeRequired,
    unique: true,
  },
  password: stringTypeRequired,
  profilePic: {
    type: String,
    default: "https://api.dicebear.com/9.x/avataaars/svg",
  },
});

usersSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();
  try {
    const salt = bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

const User = module("User", usersSchema);

export default User;
