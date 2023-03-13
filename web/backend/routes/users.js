const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const { authorize } = require("../middleware/authorization");

const {
  showMe,
  updateInfo,
  updatePassword,
  deleteUser,
  updateProfile,
} = require("../controllers/users");

router
  .route("/hr")
  .get(authenticate, authorize("hr"), showMe)
  .patch(authenticate, authorize("hr"), updateInfo)
  .delete(authenticate, authorize("hr"), deleteUser);
router
  .route("/hr/updatePassword")
  .patch(authenticate, authorize("hr"), updatePassword);

router
  .route("/candidate")
  .get(authenticate, authorize("candidate"), showMe)
  .patch(authenticate, authorize("candidate"), updateInfo)
  .delete(authenticate, authorize("candidate"), deleteUser);
router
  .route("/candidate/updatePassword")
  .patch(authenticate, authorize("candidate"), updatePassword);

router
  .route("/candidate/updateProfile")
  .patch(authenticate, authorize("candidate"), updateProfile);

module.exports = router;
