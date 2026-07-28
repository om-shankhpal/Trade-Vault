import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(500, "Internal Server Error");
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    data: null,
  });
};

export default errorHandler;