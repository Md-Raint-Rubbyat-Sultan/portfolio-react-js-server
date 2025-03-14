import { model, Schema } from "mongoose";

const stringTypeRequired = { type: String, required: true };
const stringTypeDefault = { type: String, default: null };

const profileSchema = new Schema({
  name: stringTypeRequired,
  title: stringTypeRequired,
  description: stringTypeRequired,
});

const contactSchema = new Schema({
  phone: stringTypeRequired,
  email: stringTypeRequired,
  location: stringTypeRequired,
  linkedIn: stringTypeRequired,
  gitHub: stringTypeRequired,
});

const technologySchema = new Schema({
  name: stringTypeRequired,
  level: stringTypeDefault, // default
  logo: stringTypeDefault, // default
});

const educationSchema = new Schema({
  institution: stringTypeRequired,
  degree: stringTypeRequired,
  location: stringTypeRequired,
  year: { start: stringTypeRequired, end: stringTypeRequired },
});

const experienceSchema = new Schema({
  institution: stringTypeDefault, // default
  degree: stringTypeDefault, // default
  location: stringTypeDefault, // default
  year: { start: stringTypeDefault, end: stringTypeDefault }, // default
});

const adminDataSchema = new Schema({
  profile: profileSchema,
  contact: contactSchema,
  technical_skills: [
    { category: stringTypeRequired, tech: [technologySchema] },
  ],
  language_skills: [
    {
      name: stringTypeRequired,
      level: stringTypeDefault, // default
    },
  ],
  education: [educationSchema],
  experience: [experienceSchema],
});

const adminData = model("AdminData", adminDataSchema);

export default adminData;
