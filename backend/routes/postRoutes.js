import { posts, users } from "../models.js";
import express from "express";
import { authorizeUser } from "../server.js";
import upload from "../imageUploader.js";
import mongoose from "mongoose";
const router = express.Router();
const postsPerPage = 2;

// Create a post [Authenticated]
router.post(
  "/create",
  authorizeUser,
  upload.single("image"),
  async (req, res, next) => {
    const post = new posts({
      title: req.body.title,
      authorDetails: req.body.authorId,
      image: "http://127.0.0.1:8080/" + req.file.path.slice(6),
      tags: req.body.tags,
    });
    try {
      // TODO: response is not ending
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
      .aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: Number(req.query.page) * postsPerPage },
        { $limit: postsPerPage },
        {
          $lookup: {
            from: "users",
            localField: "authorDetails",
            foreignField: "_id",
            as: "authorDetails",
            pipeline: [{ $project: { name: 1, image: 1 } }],
          },
        },
        { $unwind: "$authorDetails" },
      ])
      .exec();
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
      {
        $lookup: {
          from: "users",
          localField: "authorDetails",
          foreignField: "_id",
          as: "authorDetails",
          pipeline: [{ $project: { name: 1, image: 1 } }],
        },
      },
      { $unwind: "$authorDetails" },
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
            authorDetails: mongoose.Types.ObjectId(req.params.userId),
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: Number(req.query.page) * postsPerPage },
        { $limit: postsPerPage },
        {
          $lookup: {
            from: "users",
            localField: "authorDetails",
            foreignField: "_id",
            as: "authorDetails",
            pipeline: [{ $project: { name: 1, image: 1 } }],
          },
        },
        { $unwind: "$authorDetails" },
      ])
      .exec();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Get Featured Posts
router.get("/featured", async (req, res, next) => {
  try {
    const response = await posts
      .aggregate([
        { $sort: { likes: -1 } },
        { $limit: 2 },
        {
          $lookup: {
            from: "users",
            localField: "authorDetails",
            foreignField: "_id",
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },
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
    const response = await posts
      .findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 } },
        { new: true }
      )
      .populate("authorDetails", "name image")
      .exec();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Unlike a post [Authenticated]
router.get("/unlike/:id", authorizeUser, async (req, res, next) => {
  try {
    const response = await posts
      .findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: -1 } },
        { new: true }
      )
      .populate("authorDetails")
      .exec();
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
    const response = await posts
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate("authorDetails")
      .exec();
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

router.get("/", async (req, res, next) => {
  try {
    const pipeline = [];
    if (req.query.tag) pipeline.push({ tags: req.query.tag });
    if (req.query.userId)
      pipeline.push({
        authorDetails: mongoose.Types.ObjectId(req.query.userId),
      });
    if (req.query.postId)
      pipeline.push({ _id: mongoose.Types.ObjectId(req.query.postId) });
    let filter = { $and: [...pipeline] };
    if (pipeline.length == 0) {
      filter = {};
    }

    const response = await posts.aggregate([
      {
        $match: {
          ...filter,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: Number(req.query.skip) || 0 },
      { $limit: Number(req.query.limit) || 1 },
      {
        $lookup: {
          from: "users",
          localField: "authorDetails",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" },
    ]);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

// Get a post details
router.get("/:id", async (req, res, next) => {
  try {
    const response = await posts
      .findById(req.params.id)
      .populate("authorDetails")
      .exec();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
