const HR = require("../models/HR");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ hr: req.hr });
};

module.exports = { showMe };
