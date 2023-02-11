const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const { showMe } = require("../controllers/candidate");

router.route("/showMeCandidate").get(authenticate("candidate"), showMe);

module.exports = router;
