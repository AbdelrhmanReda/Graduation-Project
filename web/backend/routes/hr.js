const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const { showMe } = require("../controllers/hr");

router.route("/showMeHR").get(authenticate("hr"), showMe);

module.exports = router;
