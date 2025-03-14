import projects from "../../../../models/projects/projects.js";

const allProjects = async (req, res) => {
  const countProject = await projects.estimatedDocumentCount({});
  const lim = req?.query?.lim || countProject;
  const result = await projects.find({}).limit(lim);
  res.status(200).send({ countProject, data: result });
};

export default allProjects;
