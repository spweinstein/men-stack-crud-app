const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const db = require("./db/connection");
const path = require("path");
const methodOverride = require("method-override");
dotenv.config();

// Instantiate express app
const app = express();

// Connect to database & start server
db.on("connected", () => {
  console.clear();
  console.log(`Connected to MongoDB database ${db.name}`);
  app.listen(3000, () => {
    console.log("Server listening on PORT 3000...");
  });
});

// Middlewares
app.use(logger("dev"));


// Routes
