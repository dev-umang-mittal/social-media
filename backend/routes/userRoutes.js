import { users } from "../models.js";
import express from "express";
import jwt from "jsonwebtoken";
import { authorizeUser } from "../server.js";
const router = express.Router();

// Get a user details
router.get("/:id", async (req, res, next) => {
  try {
    const response = await users.findById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

// Signup a user
router.post("/create", async (req, res, next) => {
  const user = new users({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.image = `https://avatars.dicebear.com/api/adventurer-neutral/${user._id}.svg`;
  try {
    const response = await user.save();
    const accessToken = jwt.sign(
      { sub: response._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ accessToken, response });
  } catch (e) {
    next(e);
  }
});

// Login a user
router.post("/login", async (req, res, next) => {
  try {
    const response = await users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!response) {
      res.json({ response });
      return;
    }
    const accessToken = jwt.sign(
      { sub: response._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ accessToken, response });
  } catch (e) {
    next(e);
  }
});

router.get("/logout", authorizeUser, (req, res) => {
  const accessToken = jwt.sign({ sub: "logout" }, "", { expiresIn: "2s" });
  res.status(200).json({ accessToken });
});

// Update user details [Authnenticated]
router.patch("/update/:id", authorizeUser, async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id);
    if (user?._id.toString() !== req.userId.sub) {
      res.sendStatus(403);
      return;
    }
    const response = await users.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(response);
  } catch (e) {
    next(e);
  }
});

// Delete a user [Authnenticated]
router.delete("/delete/:id", authorizeUser, async (req, res, next) => {
  try {
    const user = await users.findById(req.params.id);
    if (user?._id.toString() !== req.userId.sub) {
      res.sendStatus(403);
      return;
    }
    const response = await users.findOneAndDelete({ _id: req.params.id });
    res.json(response);
  } catch (e) {
    next(e);
  }
});

export default router;
