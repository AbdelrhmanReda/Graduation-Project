const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const CustomeAPIError = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  if (!jobs.length) {
    throw new CustomeAPIError.NotFoundError("No jobs found");
  }
  res.status(StatusCodes.OK).json({ jobs });
};

const getAllMyJobs = async (req, res) => {
  const jobs = await Job.find({ hr: req.user.id });
  if (!jobs.length) {
    throw new CustomeAPIError.NotFoundError(
      `No jobs found for hr ${req.user.name}`
    );
  }
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const job_id = req.params.id;
  const job = await Job.findOne({ _id: job_id });

  if (!job) {
    throw new CustomeAPIError.NotFoundError(`No job with id ${job_id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.hr = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const editJob = async (req, res) => {
  const job_id = req.params.id;
  const job = await Job.findByIdAndUpdate({ _id: job_id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new CustomeAPIError.NotFoundError(`No job with id ${job_id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const job_id = req.params.id;
  const job = await Job.findByIdAndDelete({ _id: job_id });

  if (!job) {
    throw new CustomeAPIError.NotFoundError(`No job with id ${job_id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getAllMyJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
};
