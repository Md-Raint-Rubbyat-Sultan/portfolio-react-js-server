import { model, Schema } from "mongoose";

const stringTypeRequired = { type: String, required: true, trim: true };
const stringTypeDefault = { type: String, default: null };

const siteSchema = {
  site: stringTypeDefault, // default
  git: stringTypeDefault, // default
};

const technologySchema = {
  name: stringTypeRequired,
  logo: stringTypeRequired,
};

const chalangesSchema = {
  img: stringTypeRequired,
  chalange: stringTypeRequired,
};

const projectsSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const projects = model("Projects", projectsSchema);

export default projects;
