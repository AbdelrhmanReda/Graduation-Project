const { StatusCodes } = require("http-status-codes");
const Candidate = require("../models/Candidate");
const { findByIdAndDelete } = require("../models/HR");
const HR = require("../models/HR");

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const updateInfo = async (req, res) => {
  delete req.body.password;
  const User = req.user.role === "hr" ? HR : Candidate;

  const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req, res) => {
  const User = req.user.role === "hr" ? HR : Candidate;

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide the old and new password"
    );
  }
  const user = await User.findOne({ _id: req.role.id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

const deleteUser = async (req, res) => {
  const User = req.user.role === "hr" ? HR : Candidate;
  await User.findByIdAndDelete({ _id: req.role.id });

  res.status(StatusCodes.OK).json({ msg: "Success! user deleted." });
};

module.exports = {
  showMe,
  updateInfo,
  updatePassword,
  deleteUser,
};
