const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");

const {
  showMe,
  updateInfo,
  updatePassword,
  deleteUser,
} = require("../controllers/users");

router
  .route("/hr")
  .get(authenticate("hr"), showMe)
  .patch(authenticate("hr"), updateInfo)
  .delete(authenticate("hr"), deleteUser);
router.route("/hr/updatePassword").patch(authenticate("hr"), updatePassword);

router
  .route("/candidate")
  .get(authenticate("candidate"), showMe)
  .patch(authenticate("candidate"), updateInfo)
  .delete(authenticate("candidate"), deleteUser);
router
  .route("/candidate/updatePassword")
  .patch(authenticate("candidate"), updatePassword);

module.exports = router;
