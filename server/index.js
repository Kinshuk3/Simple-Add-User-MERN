const express = require("express");
const app = express();
const UserModel = require("./models/Users");
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

app.use(express.json()); // Enable middleware to parse incoming JSON data
app.use(cors())

mongoose
  .connect(
    "mongodb+srv://user123:Password123@cluster0.wpawqal.mongodb.net/mernadduser?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

app.post("/createUser", (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);

  newUser
    .save()
    .then(() => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
