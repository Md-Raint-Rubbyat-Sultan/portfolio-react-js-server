import projects from "../../../../models/projects/projects.js";

const allProjects = async (req, res) => {
  try {
    const countProject = await projects.estimatedDocumentCount({});

    const lim =
      (typeof parseInt(req?.query?.lim) === "number" &&
        parseInt(req?.query?.lim)) ||
      countProject;

    const result = await projects.find({}).limit(lim);
    res.status(200).send({ countProject, data: result });
  } catch (err) {
    res.send(err.message);
  }
};

export default allProjects;
