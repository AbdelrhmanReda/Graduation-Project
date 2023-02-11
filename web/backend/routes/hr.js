const express = require("express");
const router = express.Router();
const { authenticateHR } = require("../middleware/authentication");
const { showMe } = require("../controllers/hr");

router.route("/showMe").get(authenticateHR, showMe);

module.exports = router;
