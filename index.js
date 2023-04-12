const express = require("express");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.paph0zm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Start
const run = async () => {
  try {
    await client.connect();
    const blogsCollection = client.db("blog-cms").collection("blogs");

    app.get("/blogs", async (req, res) => {
      const query = {};
      const blogArray = await blogsCollection.find(query).toArray();

      res.send(blogArray);
    });
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
