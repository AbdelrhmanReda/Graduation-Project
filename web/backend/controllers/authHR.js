const HR = require("../models/HR");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await HR.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const hr = await HR.create(req.body);
  const tokenHR = { name: hr.name, hrId: hr._id, role: hr.role };
  attachCookiesToResponse({ res, hr: tokenHR });
  res.status(StatusCodes.CREATED).json({ hr: tokenHR });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const hr = await HR.findOne({ email });

  if (!hr) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await hr.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenHR = { name: hr.name, hrId: hr._id, role: hr.role };
  attachCookiesToResponse({ res, hr: tokenHR });
  res.status(StatusCodes.CREATED).json({ hr: tokenHR });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "hr logged out!" });
};

module.exports = {
  register,
  login,
  logout,
};
