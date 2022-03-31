import { users } from "../models.js";
import express from "express";
import jwt from "jsonwebtoken";
import { authorizeUser } from "../server.js";
import { Auth } from "two-step-auth";
import upload from "../imageUploader.js";
import { OAuth2Client } from "google-auth-library";
import md5 from "md5";
const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_AUTHENTICATION);

async function verify(token, res) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTHENTICATION,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (e) {
    res.sendStatus(403);
    return null;
  }
}

const isGoogleAuth = async (req, res, next) => {
  if (!req.body.gauth) {
    next();
    return;
  }
  const payload = await verify(req.body.token, res);
  if (!payload) return;
  req.body.email = payload.email;
  req.body.name = payload.name;
  req.body.password = md5(payload.sub);
  next();
};

const signupUser = async (name, email, password) => {
  const user = new users({
    name,
    email,
    password,
  });
  user.image = `https://avatars.dicebear.com/api/adventurer-neutral/${user._id}.svg`;
  const response = await user.save();
  return response;
};

router.post("/test", isGoogleAuth, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

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
router.post("/create", isGoogleAuth, async (req, res, next) => {
  try {
    const response = await signupUser(
      req.body.name,
      req.body.email,
      req.body.password
    );
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
router.post("/login", isGoogleAuth, async (req, res, next) => {
  try {
    let response = await users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!response) {
      if (req.body.gauth) {
        response = await signupUser(
          req.body.name,
          req.body.email,
          req.body.password
        );
      } else {
        res.json({ response });
        return;
      }
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
      req.body,
      { new: true }
    );
    res.json(response);
  } catch (e) {
    next(e);
  }
});

// Update user details [Authnenticated]
router.patch("/image/:id", upload.single("image"), async (req, res, next) => {
  try {
    console.log(req.file);
    const response = await users.findOneAndUpdate(
      { _id: req.params.id },
      { image: "http://localhost:8080/" + req.file.path.slice(7) },
      { new: true }
    );
    res.json(response);
  } catch (e) {
    next(e);
  }
});

// Forgot Password Route
router.get("/forgot/:email", async (req, res, next) => {
  try {
    const responseM = await users.findOne({ email: req.params.email });
    if (responseM) {
      const response = await Auth(req.params.email, "PetSocial PPL");
      console.log(response);
      const token = jwt.sign(
        { sub: response.OTP, email: req.params.email },
        process.env.PASSWORD_SECRET,
        { expiresIn: "5m" }
      );
      res.send({ token });
    } else {
      res.send(null);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/password/:token", async (req, res, next) => {
  jwt.verify(
    req.params.token,
    process.env.PASSWORD_SECRET,
    async (err, resp) => {
      if (err) return res.sendStatus(403);
      if (resp.sub === Number(req.body.otp)) {
        try {
          const response = await users.findOneAndUpdate(
            { email: resp.email },
            { password: req.body.password }
          );
          res.sendStatus(200);
        } catch (e) {
          next(e);
        }
      } else {
        res.sendStatus(403);
      }
    }
  );
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
