import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const validateObjectId = (paramName = "id", resourceLabel = "Resource") => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(new ApiError(400, `${resourceLabel} ID is invalid`));
    }

    next();
  };
};

export default validateObjectId;