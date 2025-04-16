import { model, Schema } from "mongoose";

const stringTypeRequired = { type: String, required: true, trim: true };

const commentsSchema = new Schema(
  {
    comment: { ...stringTypeRequired, maxLength: 1000, minLength: 1 },
    userId: {
      ...stringTypeRequired,
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: async (userId) => {
          const userExist = await model("User").exists({ _id: userId });
          return userExist;
        },
        message: "User reference is invalid",
      },
    },
    projectId: {
      ...stringTypeRequired,
      type: Schema.Types.ObjectId,
      ref: "Projects",
      validate: {
        validator: async (userId) => {
          const projectExist = await model("Projects").exists({ _id: userId });
          return projectExist;
        },
        message: "Project reference is invalid",
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentsSchema.virtual("age").get(function () {
  const miliSec = Date.now() - this.createdAt;
  const sec = Math.floor(miliSec / 1000);
  const min = Math.floor(sec / 60);
  const hours = Math.floor(min / 60);
  const day = Math.floor(hours / 24);
  const year = Math.floor(day / 365);

  if (min < 1) return "Just now";
  if (min < 60) return `${min}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (day < 356) return `${day}d ago`;

  return `${year}y ago`;
});

const Comment = model("Comment", commentsSchema);

export default Comment;
