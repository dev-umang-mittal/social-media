// Pulling in ENVIRONMENT variables
import "dotenv/config";

// Initialization
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./errorHandler.js";
const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to database.");
});

// => User Routes
import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);

// => Post Routes
import postRouter from "./routes/postRoutes.js";
app.use("/post", postRouter);

// => Comment Routes
import commentRoutes from "./routes/commentRoutes.js";
app.use("/comment", commentRoutes);

app.use(errorHandler);

app.listen(8080, () => {
  console.info("Server is listening on port 8080");
});
