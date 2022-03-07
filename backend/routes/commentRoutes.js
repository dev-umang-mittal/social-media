import { comments } from "../models";
const express = require("express");
const router = express.Router();

// Create a comment
router.post("/create", async (req, res, next) => {
  const comment = new comments({
    commentedOnId: req.body.commentedOnId,
    comment: req.body.comment,
    commenter: req.body.commenter,
  });
  try {
    const response = comment.save();
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
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const response = await commentModel.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
