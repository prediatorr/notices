const express = require("express");
const app = express.Router();
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

app.post(
  "/create",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }).notEmpty(),
    body("username").notEmpty(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({
        errors: result.array(),
      });

    try {
      const user = await User.create(req.body);
      user.hashPassword();
      await user.save();

      const token = await jwt.sign(
        {
          name: user.name,
          email: user.email,
          username: user.username,
          id: user.id,
        },
        process.env.SECRET
      );

      return res.json({
        success: true,
        token,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }
);

app.post(
  "/login",
  [body("username").notEmpty(), body("password").notEmpty()],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({
        errors: result.array(),
      });
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user || !user.comparePassword(req.body.password))
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        username: user.username,
        id: user.id,
      },
      process.env.SECRET
    );
    return res.json({
      success: true,
      token,
    });
  }
);

module.exports = app;
