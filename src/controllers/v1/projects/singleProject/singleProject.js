import projects from "../../../../models/projects/projects.js";
import { ObjectId } from "mongodb";

const singleProject = async (req, res) => {
  const projectId = req?.params?.id;
  try {
    const result = await projects.findById({ _id: new ObjectId(projectId) });
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
};

export default singleProject;
