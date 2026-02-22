import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// import userRoutes from "./routes/user.routes";
// import { errorHandler } from "./middlewares/error.middleware";
// import { notFoundHandler } from "./middlewares/notfound.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// // Routes
// app.use("/api/users", userRoutes);

// // 404 handler
// app.use(notFoundHandler);

// // Error handler
// app.use(errorHandler);

export default app;