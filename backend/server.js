// Pulling in ENVIRONMENT variables
require("dotenv").config();

// Initialization
import { users, posts } from "./models";
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// mongoose.connect("mongodb://localhost/")
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to database.");
});

// => User Routes
const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

// => Post Routes
const postRouter = require("./routes/postRoutes");
app.use("/post", postRouter);

// =. Routes
const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);
