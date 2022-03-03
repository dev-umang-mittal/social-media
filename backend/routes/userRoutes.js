const express = require("express");
const router = express.Router();

// Signup a user
router.post("/create", async (req, res, next) => {});

// Login a user
router.post("/login", async (req, res, next) => {});

// Update user details [Authnenticated]
router.patch("/update", async (req, res, next) => {});

// Delete a user [Authnenticated]
router.delete("/delete", async (req, res, next) => {});

module.exports = router;
