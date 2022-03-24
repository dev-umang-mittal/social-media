import { comments, posts } from "../models.js";
import express from "express";
import { authorizeUser } from "../server.js";
const router = express.Router();

// Create a comment
router.post("/create", authorizeUser, async (req, res, next) => {
  const comment = new comments({
    comment: req.body.comment,
    commenter: req.body.commenter,
    commentedOnId: req.body.commentedOnId,
  });
  try {
    const response = await comment.save();
    await posts.findOneAndUpdate(
      { _id: req.body.commentedOnId },
      {
        $inc: { comments: 1 },
      }
    );
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

//Get all the comments of a blog
router.get("/blog/:id", async (req, res, next) => {
  try {
    const response = await comments
      .find({ commentedOnId: req.params.id })
      .populate("commenter");
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Delete a user [Authnenticated]
router.delete("/delete/:id", authorizeUser, async (req, res, next) => {
  try {
    const comment = await comments.findById(req.params.id);
    if (comment.commenter.id !== req.userId) res.sendStatus(403);
    const response = await comments.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
