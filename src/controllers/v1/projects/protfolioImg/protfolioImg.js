import projects from "../../../../models/projects/projects.js";
import { ObjectId } from "mongodb";

const protfolioImg = async (req, res) => {
  const projectId = "67d6ae793ad6a8cf68bfaf51";

  if (!ObjectId.isValid(projectId)) {
    return res.status(400).send({ message: "Invalid project ID!" });
  }

  try {
    const result = await projects.findById(new ObjectId(projectId));

    // Check if project exists
    if (!result) {
      return res.status(404).send({ message: "Project not found!" });
    }

    res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default protfolioImg;
