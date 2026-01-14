const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const db = require("./db/connection");
const path = require("path");
const methodOverride = require("method-override");
dotenv.config();
const JobApp = require("./models/jobApp.js");
const jobApp = require("./models/jobApp.js");

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
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", {
    pageTitle: "Job Application Tracker",
  });
});

app.get("/jobApps", async (req, res) => {
  const jobApps = await JobApp.find();
  res.render("./jobApps/index.ejs", {
    pageTitle: "Job Applications",
    jobApps,
  });
});

app.get("/jobApps/new", (req, res) => {
  res.render("./jobApps/new.ejs", {
    pageTitle: "New Job Application",
  });
});

app.get("/jobApps/:id", async (req, res) => {
  const jobApp = await JobApp.findById(req.params.id);
  console.log(jobApp);
  res.render("./jobApps/show.ejs", {
    pageTitle: `View Job App`,
    jobApp,
  });
});

app.get("/jobApps/:id/edit", async (req, res) => {
  const jobApp = await JobApp.findById(req.params.id);
  console.log(jobApp);
  res.render("./jobApps/edit.ejs", {
    pageTitle: "Edit Job App",
    jobApp,
  });
});

app.post("/jobApps", async (req, res) => {
  console.log(req.body);
  req.body.archived = req.body.archived === "on" ? true : false;
  await JobApp.create(req.body);
  res.redirect("/jobApps");
});

app.delete("/jobApps/:id", async (req, res) => {
  await JobApp.findByIdAndDelete(req.params.id);
  res.redirect("/jobApps");
});

app.put("/jobApps/:id", async (req, res) => {
  console.log(req.body);
  req.body.archived = req.body.archived === "on" ? true : false;
  await JobApp.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/jobApps/${req.params.id}`);
});
