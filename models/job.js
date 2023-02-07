const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "title too short"],
    maxlength: 30,
    trim: true,
    // required: [true, "Please job title"],
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: "Comapany",
    // required: [true, "Please provide company name"],
  },
  hr: {
    // type: [hrSchema],
  },
  accountManager: {
    type: mongoose.Types.ObjectId,
    ref: "AccountManager",
    // required: [true, "Please provide account manager"],
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "remote", "internship"],
    // default: "full-time",
  },
  status: {
    type: String,
    enum: ["active", "pending", "closed"],
    // default: "pending",
  },
  industry: {
    type: String,
    // required: [true, "Please provide industry"],
  },
  salary: {
    type: Number,
    // required: [true, "Please provide salary"],
  },
  experienceYears: {
    type: String,
    enum: ["none", "Fresher", "0-1 year", "1-3 years", "4-5 years", "5+ years"],
    // default: "none",
  },
  openingDate: {
    type: Date,
    // default: Date.now(),
  },
  numberOfPositions: {
    type: Number,
    // default: 1,
  },
  description: {
    type: String,
  },
  requirement: {
    type: String,
  },
  benefits: {
    type: String,
  },

  location: {
    type: Object,
    // required: [true, "please provide location"],
  },
});

module.exports = mongoose.model("jobs", JobSchema);
