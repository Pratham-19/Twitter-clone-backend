const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: err,
      });
    });
});
router.post("/login", (req, res, next) => {});
