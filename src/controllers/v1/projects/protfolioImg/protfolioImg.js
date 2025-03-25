import projects from "../../../../models/projects/projects.js";
import mongoose from "mongoose";

const protfolioImg = async (req, res) => {
  const projectId = "67d6ae793ad6a8cf68bfaf51";

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).send({ message: "Invalid project ID!" });
  }

  try {
    const result = await projects.findById(
      new mongoose.Types.ObjectId(projectId),
      {
        technologies: 1,
        _id: 0,
      }
    );

    // Check if project exists
    if (!result) {
      return res.status(404).send({ message: "Project not found!" });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default protfolioImg;
