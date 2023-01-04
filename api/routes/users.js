const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ tagname: req.body.tagname })
    .exec()
    .then((user) => {
      if (user.length) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              tagname: req.body.tagname,
              password: hash,
              avatar: req.body.avatar,
            });
            user
              .save()
              .then((result) => {
                return res.status(201).json({
                  success: true,
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
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
