const Application = require("../models/Application");
const { StatusCodes } = require("http-status-codes");
const CustomeAPIError = require("../errors");

const applyForJob = async (req, res) => {
  req.body.candidate = req.user.id;
  console.log(req.body.candidate);
  // req.body.job = req.job.id;
  delete req.body.status;

  const applicationExists = await Application.findOne({
    candidate: req.body.candidate,
    job: req.body.job,
  });
  if (applicationExists) {
    throw new CustomeAPIError.BadRequestError(
      `candidate already applied for this position`
    );
  }

  const application = await Application.create(req.body);
  res.status(StatusCodes.CREATED).json({ application });
};

const getAllApps = async (req, res) => {
  const applications = await Application.find({
    candidate: req.user.id,
  })
    .populate({
      path: "candidate",
      select: "-password",
    })
    .populate({ path: "job" });

  if (!applications) {
    throw new CustomeAPIError.NotFoundError(`No applications found`);
  }
  res.status(StatusCodes.OK).json({ applications });
};

const getApp = async (req, res) => {
  const appId = req.params.id;
  const application = await Application.findOne({
    _id: appId,
    candidate: req.user.id,
  });
  if (!application) {
    throw new CustomeAPIError.NotFoundError(`No application with id ${appId}`);
  }
  res.status(StatusCodes.OK).json({ application });
};
const deleteApp = async (req, res) => {
  const appId = req.params.id;
  const application = await Application.findByIdAndDelete({
    _id: appId,
    candidate: req.user.id,
  });

  if (!application) {
    throw new CustomeAPIError.NotFoundError(`No application with id ${appId}`);
  }
  res.status(StatusCodes.OK).json({ application });
};
const editAppStatus = async (req, res) => {
  const app_id = req.params.appId;
  if (!req.body.status) {
    throw new CustomeAPIError.BadRequestError(
      `application status must be provided`
    );
  }
  const application = await Application.findByIdAndUpdate(
    { _id: app_id },
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!application) {
    throw new CustomeAPIError.NotFoundError(`No application with id ${job_id}`);
  }
  res.status(StatusCodes.OK).json({ application });
};

const getSingleJobApps = async (req, res) => {
  const job_id = req.params.id;
  const applications = await Application.find({ job: job_id }).populate({
    path: "candidate",
    select: "-password",
  });

  if (!applications) {
    throw new CustomeAPIError.NotFoundError(
      `No applications associated with job id ${job_id}`
    );
  }
  res.status(StatusCodes.OK).json({ applications });
};

const getSingleJobApp = async (req, res) => {
  const job_id = req.params.id;
  const app_id = req.params.appId;

  const application = await Application.findOne({ _id: app_id, job: job_id });
  if (!application) {
    throw new CustomeAPIError.NotFoundError(
      `Application with id ${app_id} Not found`
    );
  }
  res.status(StatusCodes.OK).json({ application });
};

module.exports = {
  applyForJob,
  getAllApps,
  getApp,
  deleteApp,
  editAppStatus,
  getSingleJobApps,
  getSingleJobApp,
};
