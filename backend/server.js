// Pulling in ENVIRONMENT variables
require("dotenv").config();

// Initialization
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
const errorHandler = require("./errorHandler");
mongoose.connect(process.env.DATABASE_URL);
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

// => Comment Routes
const commentRoutes = require("./routes/commentRoutes");
app.use("/comment", commentRoutes);

app.use(errorHandler);

app.listen(8080, () => {
  console.info("Server is listening on port 8080");
});
