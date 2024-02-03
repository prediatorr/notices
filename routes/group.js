const express = require("express");
const { loginMiddleware } = require("../middlewares");
const { Group } = require("../models/index");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Login middleware
router.use(loginMiddleware);

router.get("/", async (req, res) => {
  const groups = await Group.find();
  return res.json({
    success: true,
    groups,
  });
});

router.post(
  "/create",
  [
    body("name").notEmpty(),
    body("handle").notEmpty(),
    body("description").notEmpty(),
    body("admins").notEmpty(),
  ],
  async (req, res) => {
    return res.json({
      success: true,
    });
  }
);

module.exports = router;
