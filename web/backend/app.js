require("dotenv").config();
const express = require("express");
require("express-async-errors");
const { connect } = require("mongoose");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const job = require("./routes/jobs");
const auth = require("./routes/auth");
// const hr = require("./routes/hr");
// const candidate = require("./routes/candidate");
const user = require("./routes/users");
const application = require("./routes/applications");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// routes
app.use("/api/jobs", job);
app.use("/api/auth", auth);
app.use("/api/users", user);
// app.use("/api/hr", hr);
// app.use("/api/candidate", candidate);
app.use("/api/application", application);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`Lestining to port ${port}`);
    });
  } catch (error) {
    console.log("failed to connect to db " + error);
  }
};

start();
