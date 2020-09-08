const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const Username = require("./models/Username");
const port = 6000;

mongoose
  .connect("mongodb://localhost:27017/archive", { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get("/usernames", async (req, res) => {
      const usernames = await Username.find();
      res.send(usernames);
    });

    app.get("/usernames/:count", async (req, res) => {
      const usernames = req.params.count
        ? await Username.find().limit(parseInt(req.params.count))
        : await Username.find();
      res.send(usernames);
    });

    app.post("/usernames", async (req, res) => {
      Username.create(req.body);
      const usernames = await Username.find();
      res.send(usernames);
    });

    app.listen(port, () => {
      console.log(`Backend app listening at http://localhost:${port}`);
    });
  });
