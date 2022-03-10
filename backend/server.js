// Pulling in ENVIRONMENT variables
import "dotenv/config";

// Initialization
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";
import cors from "cors";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("Connected to database.");
});

//Authorization Middleware
export function authorizeUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/refresh", (req, res, next) => {
  try {
    const accessToken = jwt.sign(
      { sub: req?.id, name: req?.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accessToken });
  } catch (e) {
    next(e);
  }
});

// => User Routes
import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);

// => Post Routes
import postRouter from "./routes/postRoutes.js";
app.use("/post", postRouter);

// => Comment Routes
import commentRoutes from "./routes/commentRoutes.js";
import { posts } from "./models.js";
app.use("/comment", commentRoutes);

// Search blogs
app.get("/search/:term", async (req, res, next) => {
  try {
    const response = await posts.find({
      $text: { $search: req.params.term },
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

app.use(errorHandler);

app.listen(8080, () => {
  console.info("Server is listening on port 8080");
});
