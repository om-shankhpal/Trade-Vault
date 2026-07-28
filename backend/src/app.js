import express from "express";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TradeVault API is healthy",
    data: null,
  });
});

app.use(errorHandler);

export default app;