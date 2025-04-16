import mongoose from "mongoose";
import Comment from "../../../../models/comments/comments.js";

const getComments = async (req, res) => {
  const { projectId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send({ message: "Invalid projectId" });
    }

    const allComments = await Comment.find({ projectId })
      .populate("userId", "fullName profilePic.url role")
      .select("-_id -projectId -updatedAt -__v");

    res.status(200).send({
      comments: allComments,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};

export default getComments;
