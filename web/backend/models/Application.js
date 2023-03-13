const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Types.ObjectId,
    ref: "Candidates",
    unique: false,
  },
  job: {
    type: mongoose.Types.ObjectId,
    ref: "Jobs",
    unique: false,
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Applications", AppSchema);
