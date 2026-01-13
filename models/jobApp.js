const mongoose = require("mongoose");

const jobAppSchema = new mongoose.Schema({
  company: String,
  title: String,
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offer", "Rejected"],
    default: "Applied",
  },
  url: String
});

module.exports = mongoose.model("JobApp", jobAppSchema);
