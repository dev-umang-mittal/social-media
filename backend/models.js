import validator from "validator";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [4, "Name is too short."],
    maxLength: [15, "Name is too long."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: [validator.isEmail, "Enter a valid Email."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    validate: [validator.isMD5, "Password is not valid."],
  },
  image: {
    type: String,
    default:
      "https://avatars.dicebear.com/api/adventurer-neutral/" +
      Math.random() * 1000 +
      ".svg",
  },
  bio: {
    type: String,
    default: "Doing something exciting...",
    maxLength: [50, "Maximum word limit is 50."],
  },
});

const commentSchema = mongoose.Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: {
      type: String,
      maxLength: [50, "Comment is too long"],
      trim: true,
    },
    commentedOnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    authorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
      trim: true,
      maxLength: 30,
    },
    image: {
      type: String,
    },
    tags: {
      type: String,
      lowercase: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.index({ title: "text", tags: "text" });
userSchema.index({ name: "text" });

const users = mongoose.model("users", userSchema);
const posts = mongoose.model("posts", postSchema);
const comments = mongoose.model("comments", commentSchema);

export { users, posts, comments };
