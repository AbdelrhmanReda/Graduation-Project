const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");

const {
  applyForJob,
  getAllApps,
  getApp,
  deleteApp,
} = require("../controllers/applications");

router
  .route("/")
  .post(authenticate("candidate"), applyForJob)
  .get(authenticate("candidate"), getAllApps);

router
  .route("/:id")
  .get(authenticate("candidate"), getApp)
  .delete(authenticate("candidate"), deleteApp);

module.exports = router;
