const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3002;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./api/routes/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", users);

mongoose
  .connect(
    `mongodb+srv://root:${process.env.MONGO_ATLAS_PW}@cluster0.rdbmqot.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
