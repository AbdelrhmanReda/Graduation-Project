const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");

const {
  applyForJob,
  getAllApps,
  getApp,
  deleteApp,
} = require("../controllers/applications");

router
  .route("/")
  .post(authenticate, authorize("candidate"), applyForJob)
  .get(authenticate, authorize("candidate"), getAllApps);

router
  .route("/:id")
  .get(authenticate, authorize("candidate"), getApp)
  .delete(authenticate, authorize("candidate"), deleteApp);

module.exports = router;
