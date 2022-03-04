const express = require("express");
const router = express.Router();

// Create a post
router.post("/create", async (req, res, next) => {});

// Like a post
router.get("/like", async (req, res, next) => {});

// Update post [Authnenticated]
router.patch("/update", async (req, res, next) => {});

// Delete a user [Authnenticated]
router.delete("/delete", async (req, res, next) => {});

module.exports = router;
