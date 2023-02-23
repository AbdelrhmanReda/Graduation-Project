const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");

const {
  createJob,
  getAllJobs,
  getAllMyJobs,
  getJob,
  deleteJob,
  editJob,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(authenticate("hr"), createJob);

router.route("/myJobs").get(authenticate("hr"), getAllMyJobs);

router
  .route("/:id")
  .get(getJob)
  .patch(authenticate("hr"), editJob)
  .delete(authenticate("hr"), deleteJob);

module.exports = router;
