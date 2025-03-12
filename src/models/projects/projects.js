import mongoose, { Schema, model } from "mongoose";

const siteSchema = new Schema({
  site: {
    type: String,
    default: null,
  },
  git: {
    type: String,
    default: null,
  },
});

const technologySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

const chalangesSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  chalange: {
    type: String,
    required: true,
  },
});

const projectsSchema = new Schema({
  name: { type: String, required: true },
  clintSite: siteSchema,
  serverSite: siteSchema,
  technologies: [
    {
      category: { type: String, required: true },
      tech: [technologySchema],
    },
  ],
  description: { type: String, default: "" },
  chalanges: [chalangesSchema],
});

const projects = mongoose.model("Projects", projectsSchema);

export default projects;
