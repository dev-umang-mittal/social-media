import validator from "validator";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: [4, "Username is too short."],
    maxLength: [15, "Username is too long."],
    trim: true,
  },
  userhandle: {
    type: String,
    requied: [true, "Username is required."],
    unique: true,
    trim: true,
    minLength: [4, "Username is too short."],
    maxLength: [12, "Username is too long."],
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
  },
  bio: {
    type: String,
    default: "Doing something exciting...",
    maxLength: [50, "Maximum word limit is 50."],
  },
});
const postSchema = mongoose.Schema({});
const userSchema = mongoose.Schema({});

const users = mongoose.model("users", userSchema);
const posts = mongoose.model("posts", userSchema);
const userModel = mongoose.model("users", userSchema);

export { users, posts };
