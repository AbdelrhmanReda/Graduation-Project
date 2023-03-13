const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const updateInfo = async (req, res) => {
  delete req.body.password;

  const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide the old and new password"
    );
  }
  const user = await User.findOne({ _id: req.user.id });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete({ _id: req.role.id });

  res.status(StatusCodes.OK).json({ msg: "Success! user deleted." });
};

const updateProfile = async (req, res) => {
  const { yearsOfExperience, skills, jobTitle } = req.body;
  const user = await User.findOne({ _id: req.user.id });
  const skillsArr = skills.split(",");
  const updatedUser = { ...user, yearsOfExperience, jobTitle, skillsArr };
  await User.findByIdAndUpdate(req.user.id, updatedUser);
  res.status(StatusCodes.OK).json({ msg: "Success! profile updated" });
};

module.exports = {
  showMe,
  updateInfo,
  updatePassword,
  deleteUser,
  updateProfile,
};
