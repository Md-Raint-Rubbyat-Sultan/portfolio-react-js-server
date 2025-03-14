import mongoose, { Schema } from "mongoose";

const stringTypeRequired = { type: String, required: true };
const stringTypeDefault = { type: String, default: null };

const siteSchema = new Schema({
  site: stringTypeDefault, // default
  git: stringTypeDefault, // default
});

const technologySchema = new Schema({
  name: stringTypeRequired,
  logo: stringTypeRequired,
});

const chalangesSchema = new Schema({
  img: stringTypeRequired,
  chalange: stringTypeRequired,
});

const projectsSchema = new Schema({
  name: stringTypeRequired,
  clintSite: siteSchema,
  serverSite: siteSchema,
  technologies: [
    {
      category: stringTypeRequired,
      tech: [technologySchema],
    },
  ],
  description: stringTypeDefault, // default
  chalanges: [chalangesSchema],
});

const projects = mongoose.model("Projects", projectsSchema);

export default projects;
