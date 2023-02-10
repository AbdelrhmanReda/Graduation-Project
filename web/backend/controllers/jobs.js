const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const CustomeAPIError = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const job_id = req.params.id;
  const job = await Job.findOne({ _id: job_id });

  if (!job) {
    throw new CustomeAPIError.NotFoundError(`No job with id ${job_id}`);
  }
  res.status(StatusCodes.OK).json({ job });
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
  getJob,
  createJob,
  editJob,
  deleteJob,
};
