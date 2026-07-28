import express from "express";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import profileRoutes from "./modules/profile/profile.routes.js";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TradeVault API is healthy",
    data: null,
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

app.use(errorHandler);

export default app;