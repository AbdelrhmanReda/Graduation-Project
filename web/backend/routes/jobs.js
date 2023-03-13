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

const {
  editAppStatus,
  getSingleJobApps,
  getSingleJobApp,
} = require("../controllers/applications");

router.route("/").get(getAllJobs).post(authenticate("hr"), createJob);

router.route("/myJobs").get(authenticate("hr"), getAllMyJobs);

router
  .route("/:id")
  .get(getJob)
  .patch(authenticate("hr"), editJob)
  .delete(authenticate("hr"), deleteJob);

router.route("/:id/applications").get(authenticate("hr"), getSingleJobApps);

router
  .route("/:id/:appId")
  .get(authenticate("hr"), getSingleJobApp)
  .patch(authenticate("hr"), editAppStatus);

// router.route("/:id/applications").get

// router.route("/:id/applicationId").get

module.exports = router;
