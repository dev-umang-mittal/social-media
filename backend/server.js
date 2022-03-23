// Pulling in ENVIRONMENT variables
import "dotenv/config";

// Initialization
import express from "express";
import mongoose from "mongoose";
import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import { posts, users } from "./models.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
app.use(express.static("public"));
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

  jwt.verify(token, process.env.JWT_SECRET, (err, sub) => {
    if (err) return res.sendStatus(403);
    req.userId = sub;
    next();
  });
}

// => User Routes
import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);

// => Post Routes
import postRouter from "./routes/postRoutes.js";
app.use("/post", postRouter);

// => Comment Routes
import commentRoutes from "./routes/commentRoutes.js";
app.use("/comment", commentRoutes);

app.get("/refresh/:token", (req, res, next) => {
  let response;
  try {
    jwt.verify(req.params.token, process.env.JWT_SECRET, async (err, token) => {
      if (err) return res.sendStatus(403);
      response = await users.findById(token.sub);

      if (!response) {
        res.sendStatus(401);
        return;
      }

      const accessToken = jwt.sign(
        { sub: response._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ accessToken, response });
    });
  } catch (e) {
    next(e);
  }
});

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
