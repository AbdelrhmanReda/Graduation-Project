const ObjectId = require("mongoose").Types.ObjectId;
const Job = require("../models/job");
const CustomeAPIError = require("../errors/custom-error");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send(err.message);
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getJob = async (req, res) => {
  try {
    const job_id = req.params.id;
    if (!ObjectId.isValid(job_id)) {
      throw new CustomeAPIError("invalid id", 401);
    }

    const job = await Job.findOne({ _id: job_id });
    //const job = await Job.findOne(kkn);

    !job && res.status(400).send("job unavaialbe");
    job && res.status(200).send({ job });
  } catch ({ statusCode, message }) {
    res.status(statusCode || 400).send("err " + message);
  }
};

const editJob = async (req, res) => {
  try {
    const job_id = req.params.id;
    if (!ObjectId.isValid(job_id)) {
      throw new CustomeAPIError("invalid id", 400);
    }

    const job = await Job.findByIdAndUpdate({ _id: job_id }, req.body, {
      new: true,
      runValidators: true,
    });

    !job && res.status(400).send("job unavaialbe");
    job && res.status(200).send(job);
  } catch ({ statusCode, message }) {
    res.status(statusCode || 500).send(message);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job_id = req.params.id;
    if (!ObjectId.isValid(job_id)) {
      throw new CustomeAPIError("invalid id", 401);
    }
    const job = await Job.findByIdAndDelete({ _id: job_id });

    !job && res.status(400).send("job unavaialbe");
    job && res.status(204).send("sucessfully deleted");
  } catch ({ statusCode, message }) {
    res.status(statusCode || 500).send(message);
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
};
