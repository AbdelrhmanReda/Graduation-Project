const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");

router.route("/hr/register").post(register("HR"));
router.route("/hr/login").post(login("HR"));

router.route("/candidate/register").post(register("Candidate"));
router.route("/candidate/login").post(login("Candidate"));

router.route("/logout").post(logout);

module.exports = router;
