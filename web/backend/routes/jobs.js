const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");

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

router
  .route("/")
  .get(getAllJobs)
  .post(authenticate, authorize("hr"), createJob);

router.route("/myJobs").get(authenticate, authorize("hr"), getAllMyJobs);

router
  .route("/:id")
  .get(getJob)
  .patch(authenticate, authorize("hr"), editJob)
  .delete(authenticate, authorize("hr"), deleteJob);

router
  .route("/:id/applications")
  .get(authenticate, authorize("hr"), getSingleJobApps);

router
  .route("/:id/:appId")
  .get(authenticate, authorize("hr"), getSingleJobApp)
  .patch(authenticate, authorize("hr"), editAppStatus);

module.exports = router;
