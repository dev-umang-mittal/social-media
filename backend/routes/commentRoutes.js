import { comments } from "../models.js";
import express from "express";
import { authorizeUser } from "../server.js";
const router = express.Router();

// Create a comment
router.post("/create", authorizeUser, async (req, res, next) => {
  const comment = new comments({
    commentedOnId: req.body.commentedOnId,
    comment: req.body.comment,
    commenter: req.body.commenter,
  });
  try {
    const response = await comment.save();
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

//Get all the comments of a blog
router.get("/blog/:id", async (req, res, next) => {
  try {
    const response = await comments.find({ commentedOnId: req.params.id });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Delete a user [Authnenticated]
router.delete("/delete/:id", authorizeUser, async (req, res, next) => {
  try {
    const response = await comments.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
