import { posts } from "../models.js";
import express from "express";
import { authorizeUser } from "../server.js";
const router = express.Router();

// Create a post [Authenticated]
router.post("/create", authorizeUser, async (req, res, next) => {
  const post = new posts({
    title: req.body.title,
    image: req.body.image,
    authorDetails: req.body.authorDetails,
    tags: req.body.tags,
  });
  try {
    const response = await post.save();
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
});

// Get a post details
router.get("/:id", async (req, res, next) => {
  try {
    const response = await posts.findById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Like a post [Authenticated]
router.get("/like/:id", authorizeUser, async (req, res, next) => {
  try {
    const response = await posts.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } }
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Update post [Authnenticated]
router.patch("/update/:id", authorizeUser, async (req, res, next) => {
  try {
    const response = await posts.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Delete a user [Authnenticated]
router.delete("/delete/:id", authorizeUser, async (req, res, next) => {
  try {
    const response = await posts.deleteOne({ _id: req.params.id });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
