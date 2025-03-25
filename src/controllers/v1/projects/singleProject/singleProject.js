import projects from "../../../../models/projects/projects.js";
import mongoose from "mongoose";

const singleProject = async (req, res) => {
  const projectId = req?.params?.id;

  if (!projectId)
    return res.send({ message: "Must provide an id of the project!" });
  try {
    const result = await projects.findById({
      _id: new mongoose.Types.ObjectId(projectId),
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default singleProject;
