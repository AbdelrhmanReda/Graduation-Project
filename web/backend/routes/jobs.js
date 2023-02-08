const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJob,
  deleteJob,
  editJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);

router.route("/:id").get(getJob).patch(editJob).delete(deleteJob);

module.exports = router;
