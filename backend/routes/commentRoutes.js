const express = require("express");
const router = express.Router();

// Create a comment
router.post("/create", async (req, res, next) => {});

// Update comment details [Authnenticated]
router.patch("/update", async (req, res, next) => {});

// Delete a user [Authnenticated]
router.delete("/delete", async (req, res, next) => {});

module.exports = router;
