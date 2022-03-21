import { posts } from "../models.js";
import express from "express";
import { authorizeUser } from "../server.js";
import upload from "../imageUploader.js";
import mongoose from "mongoose";
const router = express.Router();

// Create a post [Authenticated]
router.post(
  "/create",
  authorizeUser,
  upload.single("image"),
  async (req, res, next) => {
    const post = new posts({
      title: req.body.title,
      image: "http://127.0.0.1:8080/" + req.file.path.slice(6),
      authorDetails: JSON.parse(req.body.authorDetails),
      tags: req.body.tags,
    });
    try {
      const response = await post.save();
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
);

// Get all posts for timeline
router.get("/timeline", async (req, res, next) => {
  try {
    const response = await posts
      .aggregate([{ $sort: { createdAt: -1 } }, { $limit: 20 }])
      .exec();
    res.status(200).json(response);
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

// Get post of a certain category
router.get("/category/:tag", async (req, res, next) => {
  try {
    const response = await posts.aggregate([
      { $match: { $text: { $search: req.params.tag } } },
      { $sort: { createdAt: -1 } },
      { $limit: 20 },
    ]);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Get all posts of a user
router.get("/all/:userId", async (req, res, next) => {
  try {
    const response = await posts
      .aggregate([
        {
          $match: {
            "authorDetails.id": mongoose.Types.ObjectId(req.params.userId),
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 20 },
      ])
      .exec();
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
    const post = await posts.findById(req.params.id);
    if (post?.authorDetails?.id.toString() !== req.userId.sub)
      res.sendStatus(403);
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
    const post = await posts.findById(req.params.id);
    if (post?.authorDetails?.id.toString() !== req.userId.sub)
      res.sendStatus(403);
    const response = await posts.deleteOne({ _id: req.params.id });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
