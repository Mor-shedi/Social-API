const express = require("express");
require("dotenv").config();
const dbconnection = require("./config/database");
const postRouter = require("./route/post.route");

const globalErrorHandler = require("./middleware/error.middleware");
const ApiError = require("./utils/apiError");

const app = express();

app.use(express.json());
dbconnection();

app.use("/api/posts", postRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 6000, () => {
  console.log("running in port", process.env.PORT);
});
