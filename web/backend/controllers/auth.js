const Candidate = require("../models/Candidate");
const HR = require("../models/HR");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const register = (role) => {
  return async (req, res) => {
    const { email } = req.body;
    const emailAlreadyExists = await Candidate.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists");
    }
    const User = role === "HR" ? HR : Candidate;

    const user = await User.create(req.body);
    const tokenUser = {
      name: user.name,
      id: user._id,
      role: user.role,
    };
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  };
};

const login = (role) => {
  return async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }
    const User = role === "HR" ? HR : Candidate;

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    const tokenUser = {
      name: user.name,
      id: user._id,
      role: user.role,
    };
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  };
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  logout,
};
