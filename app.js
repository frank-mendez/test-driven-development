const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

const usersRouter = require("./routes/user.router");
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
